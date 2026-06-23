import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useAuth } from './use-auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import * as api from '@/lib/api';

export function useFavorites() {
  const { user } = useAuth();
  const configured = isSupabaseConfigured();
  const [localFavorites, setLocalFavorites] = useLocalStorage<string[]>('eq-favorites', []);
  const [cloudFavorites, setCloudFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 登录用户从云端加载
  useEffect(() => {
    if (!user || !configured) {
      setCloudFavorites([]);
      return;
    }
    setLoading(true);
    api.fetchFavorites(user.id).then((data) => {
      setCloudFavorites(data);
      setLoading(false);
    });
  }, [user, configured]);

  // 登录时合并本地数据到云端
  useEffect(() => {
    if (user && configured && localFavorites.length > 0) {
      localFavorites.forEach((phraseId) => {
        if (!cloudFavorites.includes(phraseId)) {
          api.addFavorite(user.id, phraseId);
        }
      });
      // 合并后清空本地
      setLocalFavorites([]);
    }
  }, [user, configured, localFavorites, cloudFavorites, setLocalFavorites]);

  const favorites = user && configured ? cloudFavorites : localFavorites;

  const toggleFavorite = useCallback(
    (phraseId: string) => {
      if (user && configured) {
        // 云端操作
        const isFav = cloudFavorites.includes(phraseId);
        setCloudFavorites((prev) =>
          isFav
            ? prev.filter((id) => id !== phraseId)
            : [...prev, phraseId]
        );
        if (isFav) {
          api.removeFavorite(user.id, phraseId);
        } else {
          api.addFavorite(user.id, phraseId);
        }
      } else {
        // 本地操作
        setLocalFavorites((prev) =>
          prev.includes(phraseId)
            ? prev.filter((id) => id !== phraseId)
            : [...prev, phraseId]
        );
      }
    },
    [user, configured, cloudFavorites, setLocalFavorites]
  );

  const isFavorite = useCallback(
    (phraseId: string) => favorites.includes(phraseId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, loading };
}
