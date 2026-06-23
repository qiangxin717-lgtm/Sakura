import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useAuth } from './use-auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import * as api from '@/lib/api';

export interface PracticeRecord {
  totalAttempted: number;
  totalCorrect: number;
  todayAttempted: number;
  todayCorrect: number;
  lastPracticeDate: string | null;
}

const todayStr = () => new Date().toISOString().split('T')[0];

export function usePractice() {
  const { user } = useAuth();
  const configured = isSupabaseConfigured();
  const [localRecord, setLocalRecord] = useLocalStorage<PracticeRecord>('eq-practice', {
    totalAttempted: 0,
    totalCorrect: 0,
    todayAttempted: 0,
    todayCorrect: 0,
    lastPracticeDate: null,
  });
  const [cloudRecord, setCloudRecord] = useState<PracticeRecord>({
    totalAttempted: 0,
    totalCorrect: 0,
    todayAttempted: 0,
    todayCorrect: 0,
    lastPracticeDate: null,
  });

  useEffect(() => {
    if (!user || !configured) {
      setCloudRecord({
        totalAttempted: 0,
        totalCorrect: 0,
        todayAttempted: 0,
        todayCorrect: 0,
        lastPracticeDate: null,
      });
      return;
    }
    api.fetchPractice(user.id).then((data) => {
      if (data) {
        const today = todayStr();
        const isNewDay = data.last_practice_date !== today;
        setCloudRecord({
          totalAttempted: data.total_attempted,
          totalCorrect: data.total_correct,
          todayAttempted: isNewDay ? 0 : 0, // 云端不存today字段，按需重置
          todayCorrect: isNewDay ? 0 : 0,
          lastPracticeDate: data.last_practice_date,
        });
      }
    });
  }, [user, configured]);

  const record = user && configured ? cloudRecord : localRecord;

  const recordAnswer = useCallback(
    (isCorrect: boolean) => {
      const today = todayStr();

      const updateFn = (prev: PracticeRecord): PracticeRecord => {
        const isNewDay = prev.lastPracticeDate !== today;
        return {
          totalAttempted: prev.totalAttempted + 1,
          totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
          todayAttempted: isNewDay ? 1 : prev.todayAttempted + 1,
          todayCorrect: isNewDay
            ? isCorrect ? 1 : 0
            : prev.todayCorrect + (isCorrect ? 1 : 0),
          lastPracticeDate: today,
        };
      };

      if (user && configured) {
        const newData = updateFn(cloudRecord);
        setCloudRecord(newData);
        api.savePractice(user.id, {
          total_attempted: newData.totalAttempted,
          total_correct: newData.totalCorrect,
          last_practice_date: newData.lastPracticeDate,
        });
      } else {
        setLocalRecord(updateFn);
      }
    },
    [user, configured, cloudRecord, setLocalRecord]
  );

  return { record, recordAnswer };
}
