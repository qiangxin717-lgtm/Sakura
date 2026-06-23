import { supabase, isSupabaseConfigured } from './supabase';
import type { CommunityShare, Comment, Bilingual, UserProfile } from '@/types';

// ============ 社区分享 ============

export async function fetchShares(currentUserId?: string): Promise<CommunityShare[]> {
  if (!isSupabaseConfigured()) return [];

  // 查询分享 + 作者资料
  const { data: shares, error } = await supabase
    .from('community_shares')
    .select(
      `
      id,
      user_id,
      scenario,
      phrase,
      insight,
      likes_count,
      created_at,
      profiles!inner(display_name, avatar)
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[API] 获取分享失败:', error.message);
    return [];
  }

  // 查询当前用户点赞的分享
  let likedShareIds: Set<string> = new Set();
  if (currentUserId) {
    const { data: likes } = await supabase
      .from('likes')
      .select('share_id')
      .eq('user_id', currentUserId);
    if (likes) {
      likedShareIds = new Set(likes.map((l) => l.share_id));
    }
  }

  return (shares || []).map((s: any) => ({
    id: s.id,
    user_id: s.user_id,
    author: s.profiles?.display_name ?? '匿名用户',
    avatar: s.profiles?.avatar ?? null,
    scenario: typeof s.scenario === 'string' ? JSON.parse(s.scenario) : s.scenario,
    phrase: typeof s.phrase === 'string' ? JSON.parse(s.phrase) : s.phrase,
    insight: typeof s.insight === 'string' ? JSON.parse(s.insight) : s.insight,
    likes_count: s.likes_count ?? 0,
    is_liked: likedShareIds.has(s.id),
    created_at: s.created_at,
  }));
}

export async function createShare(
  userId: string,
  scenario: Bilingual,
  phrase: Bilingual,
  insight: Bilingual
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase 未配置' };
  }
  const { error } = await supabase.from('community_shares').insert({
    user_id: userId,
    scenario: JSON.stringify(scenario),
    phrase: JSON.stringify(phrase),
    insight: JSON.stringify(insight),
  });
  return { error: error?.message ?? null };
}

export async function deleteShare(shareId: string): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase 未配置' };
  }
  const { error } = await supabase.from('community_shares').delete().eq('id', shareId);
  return { error: error?.message ?? null };
}

// ============ 点赞 ============

export async function toggleLike(
  userId: string,
  shareId: string,
  currentlyLiked: boolean
): Promise<{ error: string | null; liked: boolean }> {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase 未配置', liked: false };
  }

  if (currentlyLiked) {
    // 取消点赞
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('share_id', shareId);
    if (error) return { error: error.message, liked: true };
    // 更新计数（触发器或手动）
    try {
      await supabase.rpc('decrement_likes', { share_id: shareId });
    } catch {
      await supabase.rpc('update_likes_count', { share_id: shareId });
    }
    return { error: null, liked: false };
  } else {
    // 点赞
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: userId, share_id: shareId });
    if (error) return { error: error.message, liked: false };
    try {
      await supabase.rpc('increment_likes', { share_id: shareId });
    } catch {
      await supabase.rpc('update_likes_count', { share_id: shareId });
    }
    return { error: null, liked: true };
  }
}

// ============ 评论 ============

export async function fetchComments(shareId: string): Promise<Comment[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('comments')
    .select(
      `
      id,
      user_id,
      share_id,
      content,
      created_at,
      profiles!inner(display_name, avatar)
    `
    )
    .eq('share_id', shareId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[API] 获取评论失败:', error.message);
    return [];
  }

  return (data || []).map((c: any) => ({
    id: c.id,
    user_id: c.user_id,
    share_id: c.share_id,
    author: c.profiles?.display_name ?? '匿名用户',
    avatar: c.profiles?.avatar ?? null,
    content: c.content,
    created_at: c.created_at,
  }));
}

export async function addComment(
  userId: string,
  shareId: string,
  content: string
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase 未配置' };
  }
  const { error } = await supabase.from('comments').insert({
    user_id: userId,
    share_id: shareId,
    content,
  });
  return { error: error?.message ?? null };
}

// ============ 收藏 ============

export async function fetchFavorites(userId: string): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('favorites')
    .select('phrase_id')
    .eq('user_id', userId);
  if (error) {
    console.error('[API] 获取收藏失败:', error.message);
    return [];
  }
  return (data || []).map((f) => f.phrase_id);
}

export async function addFavorite(userId: string, phraseId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await supabase.from('favorites').insert({ user_id: userId, phrase_id: phraseId });
}

export async function removeFavorite(userId: string, phraseId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('phrase_id', phraseId);
}

// ============ 打卡 ============

export interface StreakData {
  count: number;
  last_check_in: string | null;
  history: string[];
}

export async function fetchStreak(userId: string): Promise<StreakData | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) {
    // 如果是没找到记录，返回默认值
    if (error.code === 'PGRST116') {
      return { count: 0, last_check_in: null, history: [] };
    }
    console.error('[API] 获取打卡失败:', error.message);
    return null;
  }
  return {
    count: data.count ?? 0,
    last_check_in: data.last_check_in,
    history: data.history ?? [],
  };
}

export async function saveStreak(userId: string, data: StreakData): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await supabase.from('streaks').upsert({
    user_id: userId,
    count: data.count,
    last_check_in: data.last_check_in,
    history: data.history,
  });
}

// ============ 练习记录 ============

export interface PracticeData {
  total_attempted: number;
  total_correct: number;
  last_practice_date: string | null;
}

export async function fetchPractice(userId: string): Promise<PracticeData | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('practice_records')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') {
      return { total_attempted: 0, total_correct: 0, last_practice_date: null };
    }
    console.error('[API] 获取练习记录失败:', error.message);
    return null;
  }
  return {
    total_attempted: data.total_attempted ?? 0,
    total_correct: data.total_correct ?? 0,
    last_practice_date: data.last_practice_date,
  };
}

export async function savePractice(userId: string, data: PracticeData): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await supabase.from('practice_records').upsert({
    user_id: userId,
    total_attempted: data.total_attempted,
    total_correct: data.total_correct,
    last_practice_date: data.last_practice_date,
  });
}

// ============ 管理后台 ============

export async function fetchAllShares(): Promise<CommunityShare[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('community_shares')
    .select(
      `
      id,
      user_id,
      scenario,
      phrase,
      insight,
      likes_count,
      created_at,
      profiles!inner(display_name, avatar, email)
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[API] 获取所有分享失败:', error.message);
    return [];
  }

  return (data || []).map((s: any) => ({
    id: s.id,
    user_id: s.user_id,
    author: s.profiles?.display_name ?? '匿名用户',
    avatar: s.profiles?.avatar ?? null,
    scenario: typeof s.scenario === 'string' ? JSON.parse(s.scenario) : s.scenario,
    phrase: typeof s.phrase === 'string' ? JSON.parse(s.phrase) : s.phrase,
    insight: typeof s.insight === 'string' ? JSON.parse(s.insight) : s.insight,
    likes_count: s.likes_count ?? 0,
    created_at: s.created_at,
  }));
}

export async function fetchAllUsers(): Promise<UserProfile[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[API] 获取用户列表失败:', error.message);
    return [];
  }

  return (data || []) as UserProfile[];
}

export async function updateUserRole(userId: string, role: 'user' | 'admin'): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase 未配置' };
  }
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  return { error: error?.message ?? null };
}
