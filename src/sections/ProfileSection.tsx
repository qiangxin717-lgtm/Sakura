import { useState, useEffect } from 'react';
import { Flame, Heart, Dumbbell, Users, Bookmark, Info, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/hooks/use-i18n';
import { useAuth } from '@/hooks/use-auth';
import { useFavorites } from '@/hooks/use-favorites';
import { useStreak } from '@/hooks/use-streak';
import { usePractice } from '@/hooks/use-practice';
import { getPhraseById } from '@/data/phrases';
import { getScenarioById } from '@/data/scenarios';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { UserAvatar } from '@/components/common/UserAvatar';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Button } from '@/components/ui/button';
import * as api from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { CommunityShare } from '@/types';

export function ProfileSection() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { favorites } = useFavorites();
  const { streakData } = useStreak();
  const { record } = usePractice();
  const [authOpen, setAuthOpen] = useState(false);
  const [userShares, setUserShares] = useState<CommunityShare[]>([]);

  // 加载用户自己的分享
  useEffect(() => {
    if (!user || !isSupabaseConfigured()) {
      setUserShares([]);
      return;
    }
    api.fetchShares(user.id).then((data) => {
      setUserShares(data.filter((s) => s.user_id === user.id));
    });
  }, [user]);

  const stats = [
    {
      icon: Flame,
      label: t.profile.streak,
      value: streakData.count,
      unit: t.profile.days,
      color: 'hsl(var(--scenario-conflict))',
    },
    {
      icon: Heart,
      label: t.profile.favorites,
      value: favorites.length,
      unit: t.profile.count,
      color: 'hsl(var(--scenario-romance))',
    },
    {
      icon: Dumbbell,
      label: t.profile.practiced,
      value: record.totalAttempted,
      unit: t.profile.count,
      color: 'hsl(var(--scenario-workplace))',
    },
    {
      icon: Users,
      label: t.profile.shared,
      value: userShares.length,
      unit: t.profile.count,
      color: 'hsl(var(--scenario-campus))',
    },
  ];

  const favoritePhrases = favorites
    .map((id) => getPhraseById(id))
    .filter(Boolean);

  // 未登录状态
  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <div className="rounded-2xl bg-card p-8 text-center shadow-clay animate-fade-in-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 font-heading text-xl text-foreground">
            {t.auth.loginRequired}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {t.auth.subtitle}
          </p>
          <Button onClick={() => setAuthOpen(true)} className="cursor-pointer">
            <LogIn className="mr-1.5 h-4 w-4" />
            {t.auth.login}
          </Button>
          <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      {/* 用户信息头部 */}
      <div className="mb-6 flex items-center gap-4 animate-fade-in-up">
        <UserAvatar
          name={profile?.display_name || user.email || 'U'}
          avatar={profile?.avatar}
          size="lg"
        />
        <div>
          <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
            {profile?.display_name || '用户'}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-card p-4 shadow-clay">
            <div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: stat.color + '20' }}
            >
              <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
            </div>
            <p className="font-heading text-2xl text-foreground">
              {stat.value}
              <span className="ml-1 text-xs font-body text-muted-foreground">
                {stat.unit}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 收藏列表 */}
      <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="mb-3 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg text-foreground">
            {t.profile.favoritesList}
          </h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {favorites.length}
          </span>
        </div>

        {favoritePhrases.length === 0 ? (
          <div className="rounded-2xl bg-card p-8 text-center shadow-clay">
            <Heart className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">{t.profile.noFavorites}</p>
            <button
              onClick={() => navigate('/scenarios')}
              className="mt-3 text-sm font-medium text-primary cursor-pointer hover:underline"
            >
              {t.nav.scenarios} →
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {favoritePhrases.map((phrase) => {
              if (!phrase) return null;
              const sc = getScenarioById(phrase.scenarioId);
              return (
                <div
                  key={phrase.id}
                  className="rounded-2xl bg-card p-4 shadow-clay transition-all hover:shadow-clay-lg"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: sc?.color }}
                    >
                      {sc?.name[lang]}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-foreground">
                    {phrase.content[lang]}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 设置 */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <h2 className="mb-3 font-heading text-lg text-foreground">
          {t.profile.settings}
        </h2>
        <div className="rounded-2xl bg-card p-4 shadow-clay">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                <span className="text-sm font-heading text-accent">
                  {lang === 'zh' ? '中' : 'EN'}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {t.profile.language}
              </span>
            </div>
            <LanguageToggle />
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-card p-4 shadow-clay">
          <div className="flex items-start gap-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.profile.about}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.profile.aboutText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
