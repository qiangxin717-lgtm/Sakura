import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useAuth } from './use-auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import * as api from '@/lib/api';

export interface StreakData {
  count: number;
  lastCheckIn: string | null;
  history: string[];
}

const todayStr = () => new Date().toISOString().split('T')[0];

export function useStreak() {
  const { user } = useAuth();
  const configured = isSupabaseConfigured();
  const [localData, setLocalData] = useLocalStorage<StreakData>('eq-streak', {
    count: 0,
    lastCheckIn: null,
    history: [],
  });
  const [cloudData, setCloudData] = useState<StreakData>({
    count: 0,
    lastCheckIn: null,
    history: [],
  });

  // 登录用户从云端加载
  useEffect(() => {
    if (!user || !configured) {
      setCloudData({ count: 0, lastCheckIn: null, history: [] });
      return;
    }
    api.fetchStreak(user.id).then((data) => {
      if (data) {
        setCloudData({
          count: data.count,
          lastCheckIn: data.last_check_in,
          history: data.history || [],
        });
      }
    });
  }, [user, configured]);

  const streakData = user && configured ? cloudData : localData;

  const checkIn = useCallback(() => {
    const today = todayStr();
    if (streakData.lastCheckIn === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const wasConsecutive = streakData.lastCheckIn === yesterdayStr;
    const newCount = wasConsecutive ? streakData.count + 1 : 1;
    const newData: StreakData = {
      count: newCount,
      lastCheckIn: today,
      history: [...new Set([...streakData.history, today])],
    };

    if (user && configured) {
      setCloudData(newData);
      api.saveStreak(user.id, {
        count: newData.count,
        last_check_in: newData.lastCheckIn,
        history: newData.history,
      });
    } else {
      setLocalData(newData);
    }
  }, [streakData, user, configured, setLocalData]);

  const hasCheckedInToday = streakData.lastCheckIn === todayStr();

  return { streakData, checkIn, hasCheckedInToday };
}
