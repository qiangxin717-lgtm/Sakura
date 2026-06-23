import { useState, useMemo } from 'react';
import { Plus, ThumbsUp, MessageCircle, Loader2, Send, Trash2 } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { useAuth } from '@/hooks/use-auth';
import { useCommunity, useComments } from '@/hooks/use-community';
import { scenarios } from '@/data/scenarios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/common/UserAvatar';
import { AuthDialog } from '@/components/auth/AuthDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { isSupabaseConfigured } from '@/lib/supabase';
import { initialCommunityShares } from '@/data/community';
import type { CommunityShare as CommunityShareType } from '@/types';

function timeAgo(dateStr: string, lang: 'zh' | 'en') {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (lang === 'zh') {
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  } else {
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}

export function CommunitySection() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const { shares, loading, createShare, toggleLike, deleteShare } = useCommunity();
  const [showForm, setShowForm] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [formScenario, setFormScenario] = useState('');
  const [formPhrase, setFormPhrase] = useState('');
  const [formInsight, setFormInsight] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [commentDialogShare, setCommentDialogShare] = useState<CommunityShareType | null>(null);

  const configured = isSupabaseConfigured();

  // 如果 Supabase 未配置，使用本地种子数据兜底
  const displayShares = configured ? shares : (initialCommunityShares as CommunityShareType[]);

  const sortedShares = useMemo(() => {
    return [...displayShares].sort((a, b) => {
      const aLikes = (a.likes_count ?? 0) + (a.is_liked ? 1 : 0);
      const bLikes = (b.likes_count ?? 0) + (b.is_liked ? 1 : 0);
      return bLikes - aLikes;
    });
  }, [displayShares]);

  const handlePublishClick = () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setShowForm(true);
  };

  const handlePublish = async () => {
    if (!formScenario || !formPhrase.trim() || !formInsight.trim()) return;
    const sc = scenarios.find((s) => s.id === formScenario);
    setPublishing(true);
    const { error } = await createShare(
      sc?.name ?? { zh: '日常社交', en: 'Daily Life' },
      { zh: formPhrase, en: formPhrase },
      { zh: formInsight, en: formInsight }
    );
    setPublishing(false);
    if (!error) {
      setFormScenario('');
      setFormPhrase('');
      setFormInsight('');
      setShowForm(false);
    }
  };

  const handleLike = (share: CommunityShareType) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    if (configured) {
      toggleLike(share.id, share.is_liked ?? false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      {/* 标题 + 发布按钮 */}
      <div className="mb-6 flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
            {t.community.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t.community.subtitle}</p>
        </div>
        <Button
          onClick={handlePublishClick}
          className="cursor-pointer shadow-soft"
        >
          <Plus className="mr-1 h-4 w-4" />
          {t.community.share}
        </Button>
      </div>

      {/* 未配置提示 */}
      {!configured && (
        <div className="mb-4 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          {lang === 'zh'
            ? '⚠️ Supabase 未配置，当前显示示例数据。请配置后端后启用真实社区功能。'
            : '⚠️ Supabase not configured. Showing sample data. Configure backend to enable real community.'}
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* 分享卡片流 */}
      <div className="space-y-4">
        {!loading && sortedShares.map((share, index) => {
          const isLiked = share.is_liked ?? false;
          const likeCount = share.likes_count ?? 0;
          const isOwner = user && share.user_id === user.id;
          return (
            <div
              key={share.id}
              className="rounded-2xl bg-card p-5 shadow-clay transition-all hover:shadow-clay-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* 头部 */}
              <div className="mb-3 flex items-center gap-3">
                <UserAvatar
                  name={share.author || '匿名用户'}
                  avatar={share.avatar}
                  size="md"
                />
                <div className="flex-1">
                  <p className="font-heading text-sm text-foreground">
                    {share.author || t.community.anonymous}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {timeAgo(share.created_at, lang)}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {share.scenario[lang]}
                </span>
                {isOwner && configured && (
                  <button
                    onClick={() => deleteShare(share.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                    title={t.common.delete}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* 话术 */}
              <div className="mb-3 rounded-xl bg-primary/5 p-3">
                <p className="mb-1 font-script text-sm text-muted-foreground">
                  {lang === 'zh' ? '话术' : 'Phrase'}
                </p>
                <p className="font-body text-sm leading-relaxed text-foreground">
                  {share.phrase[lang]}
                </p>
              </div>

              {/* 心得 */}
              <div className="mb-3">
                <p className="mb-1 text-xs font-semibold text-muted-foreground">
                  {t.community.insight}
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {share.insight[lang]}
                </p>
              </div>

              {/* 点赞 + 评论入口 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(share)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer',
                    isLiked
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  <ThumbsUp className={cn('h-3.5 w-3.5', isLiked && 'fill-current')} />
                  {likeCount} {t.community.likes}
                </button>
                {configured && (
                  <button
                    onClick={() => setCommentDialogShare(share)}
                    className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {t.community.comments || '评论'}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {!loading && sortedShares.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            {t.common.empty}
          </div>
        )}
      </div>

      {/* 发布表单弹窗 */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              {t.community.share}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 场景选择 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t.community.scenario}
              </label>
              <div className="flex flex-wrap gap-2">
                {scenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setFormScenario(sc.id)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer',
                      formScenario === sc.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10'
                    )}
                  >
                    {sc.name[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t.community.phrase}
              </label>
              <Textarea
                value={formPhrase}
                onChange={(e) => setFormPhrase(e.target.value)}
                placeholder={t.community.phrasePlaceholder}
                rows={2}
                className="cursor-text resize-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t.community.insight}
              </label>
              <Textarea
                value={formInsight}
                onChange={(e) => setFormInsight(e.target.value)}
                placeholder={t.community.insightPlaceholder}
                rows={3}
                className="cursor-text resize-none"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1 cursor-pointer"
              >
                {t.community.cancel}
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-1 cursor-pointer"
                disabled={!formScenario || !formPhrase.trim() || !formInsight.trim() || publishing}
              >
                {publishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.community.publish}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 评论弹窗 */}
      <CommentDialog
        share={commentDialogShare}
        onClose={() => setCommentDialogShare(null)}
      />

      {/* 认证弹窗 */}
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}

// 评论弹窗组件
function CommentDialog({
  share,
  onClose,
}: {
  share: CommunityShareType | null;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const { comments, loading, addComment } = useComments(share?.id ?? null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    const { error } = await addComment(commentText.trim());
    setSubmitting(false);
    if (!error) {
      setCommentText('');
    }
  };

  return (
    <Dialog open={!!share} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">
            {t.community.comments || '评论'}
          </DialogTitle>
        </DialogHeader>

        {share && (
          <div className="mb-3 rounded-xl bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">{share.author}</p>
            <p className="mt-1 line-clamp-2 text-sm text-foreground">
              {share.phrase[lang]}
            </p>
          </div>
        )}

        {/* 评论列表 */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-[100px]">
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : comments.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              {t.common.empty}
            </p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <UserAvatar name={c.author || '匿名'} avatar={c.avatar} size="sm" />
                <div className="flex-1 rounded-lg bg-muted/50 p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">
                      {c.author || t.community.anonymous}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(c.created_at, lang)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground">{c.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 评论输入 */}
        {user ? (
          <div className="flex gap-2 border-t border-border pt-3">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t.community.commentPlaceholder || '写下你的评论...'}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="cursor-text"
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              disabled={!commentText.trim() || submitting}
              className="cursor-pointer shrink-0"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <p className="border-t border-border pt-3 text-center text-xs text-muted-foreground">
            {t.auth.loginRequired}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
