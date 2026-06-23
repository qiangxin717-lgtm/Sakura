import { useNavigate } from 'react-router-dom';
import { Layers, Dumbbell, Users, ChevronRight, Heart } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { useDailyPhrase } from '@/hooks/use-daily-phrase';
import { getScenarioById } from '@/data/scenarios';
import { PhraseFlipCard } from '@/components/phrase/PhraseFlipCard';
import { StreakCalendar } from '@/components/common/StreakCalendar';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

export function HomeSection() {
  const { t, lang } = useI18n();
  const { dailyPhrase, recommendations } = useDailyPhrase();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const scenario = getScenarioById(dailyPhrase.scenarioId);

  const quickEntries = [
    {
      icon: Layers,
      title: t.home.scenarioLearning,
      desc: t.home.scenarioLearningDesc,
      color: 'hsl(var(--scenario-campus))',
      path: '/scenarios',
    },
    {
      icon: Dumbbell,
      title: t.home.practiceSim,
      desc: t.home.practiceSimDesc,
      color: 'hsl(var(--scenario-workplace))',
      path: '/practice',
    },
    {
      icon: Users,
      title: t.home.community,
      desc: t.home.communityDesc,
      color: 'hsl(var(--scenario-romance))',
      path: '/community',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      {/* Hero - 每日话术 */}
      <section className="mb-8 animate-fade-in-up">
        <div className="mb-4 flex items-center gap-2">
          <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
            {t.home.todayPhrase}
          </h1>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {new Date().toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">{t.app.tagline}</p>

        <div className="mx-auto max-w-2xl">
          <PhraseFlipCard
            phrase={dailyPhrase}
            lang={lang}
            scenarioName={scenario?.name[lang] ?? ''}
            scenarioColor={scenario?.color ?? 'hsl(var(--primary))'}
          />
        </div>
      </section>

      {/* 打卡 + 快速入口 */}
      <section className="mb-8 grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <StreakCalendar />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <h2 className="mb-3 font-heading text-lg text-foreground">{t.home.quickEntry}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickEntries.map((entry) => (
              <button
                key={entry.path}
                onClick={() => navigate(entry.path)}
                className="group flex flex-col gap-2 rounded-2xl bg-card p-4 text-left shadow-clay transition-all hover:shadow-clay-lg cursor-pointer"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: entry.color + '20' }}
                >
                  <entry.icon className="h-5 w-5" style={{ color: entry.color }} />
                </div>
                <div>
                  <p className="font-heading text-sm text-foreground">{entry.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 今日推荐 */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="mb-3 font-heading text-lg text-foreground">{t.home.todayRecommend}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {recommendations.map((phrase) => {
            const sc = getScenarioById(phrase.scenarioId);
            const fav = isFavorite(phrase.id);
            return (
              <div
                key={phrase.id}
                className="rounded-2xl bg-card p-4 shadow-clay transition-all hover:shadow-clay-lg"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: sc?.color }}
                  >
                    {sc?.name[lang]}
                  </span>
                  <button
                    onClick={() => toggleFavorite(phrase.id)}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full transition-all cursor-pointer',
                      fav
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    )}
                  >
                    <Heart className={cn('h-3.5 w-3.5', fav && 'fill-current')} />
                  </button>
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-foreground">
                  {phrase.content[lang]}
                </p>
                <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                  {phrase.context[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
