import { useState, useEffect, useCallback } from 'react';
import * as api from '@/lib/api';
import { useAuth } from './use-auth';
import type { CommunityShare, Comment, Bilingual } from '@/types';

export function useCommunity() {
  const { user } = useAuth();
  const [shares, setShares] = useState<CommunityShare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadShares = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchShares(user?.id);
      setShares(data);
    } catch (e) {
      setError('加载失败');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadShares();
  }, [loadShares]);

  const createShare = useCallback(
    async (scenario: Bilingual, phrase: Bilingual, insight: Bilingual) => {
      if (!user) return { error: '请先登录' };
      const { error } = await api.createShare(user.id, scenario, phrase, insight);
      if (!error) {
        await loadShares();
      }
      return { error };
    },
    [user, loadShares]
  );

  const toggleLike = useCallback(
    async (shareId: string, currentlyLiked: boolean) => {
      if (!user) return { error: '请先登录' };

      // 乐观更新
      setShares((prev) =>
        prev.map((s) =>
          s.id === shareId
            ? {
                ...s,
                is_liked: !currentlyLiked,
                likes_count: s.likes_count + (currentlyLiked ? -1 : 1),
              }
            : s
        )
      );

      const { error } = await api.toggleLike(user.id, shareId, currentlyLiked);
      if (error) {
        // 回滚
        setShares((prev) =>
          prev.map((s) =>
            s.id === shareId
              ? {
                  ...s,
                  is_liked: currentlyLiked,
                  likes_count: s.likes_count + (currentlyLiked ? 1 : -1),
                }
              : s
          )
        );
      }
      return { error };
    },
    [user]
  );

  const deleteShare = useCallback(
    async (shareId: string) => {
      const { error } = await api.deleteShare(shareId);
      if (!error) {
        setShares((prev) => prev.filter((s) => s.id !== shareId));
      }
      return { error };
    },
    []
  );

  return {
    shares,
    loading,
    error,
    createShare,
    toggleLike,
    deleteShare,
    reload: loadShares,
  };
}

// 评论 hook
export function useComments(shareId: string | null) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const loadComments = useCallback(async () => {
    if (!shareId) return;
    setLoading(true);
    const data = await api.fetchComments(shareId);
    setComments(data);
    setLoading(false);
  }, [shareId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const addComment = useCallback(
    async (content: string) => {
      if (!user || !shareId) return { error: '请先登录' };
      const { error } = await api.addComment(user.id, shareId, content);
      if (!error) {
        await loadComments();
      }
      return { error };
    },
    [user, shareId, loadComments]
  );

  return { comments, loading, addComment, reload: loadComments };
}
