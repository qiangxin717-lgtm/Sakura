import { useMemo } from 'react';
import { getDailyPhrase, phrases } from '@/data/phrases';
import type { Phrase } from '@/types';

export function useDailyPhrase() {
  const dailyPhrase = useMemo(() => getDailyPhrase(), []);

  const recommendations = useMemo(() => {
    return phrases
      .filter((p) => p.scenarioId === dailyPhrase.scenarioId && p.id !== dailyPhrase.id)
      .slice(0, 3);
  }, [dailyPhrase]);

  return { dailyPhrase, recommendations };
}

export type { Phrase };
