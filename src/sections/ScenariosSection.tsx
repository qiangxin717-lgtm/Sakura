import { useState } from 'react';
import { useI18n } from '@/hooks/use-i18n';
import { scenarios, getScenarioById } from '@/data/scenarios';
import { phrases, getPhrasesByScenario } from '@/data/phrases';
import { PhraseCard, PhraseDetailDialog } from '@/components/phrase/PhraseCard';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Phrase } from '@/types';

export function ScenariosSection() {
  const { t, lang } = useI18n();
  const [selectedScenario, setSelectedScenario] = useState<string>('all');
  const [detailPhrase, setDetailPhrase] = useState<Phrase | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPhrases =
    selectedScenario === 'all'
      ? phrases
      : getPhrasesByScenario(selectedScenario);

  const handleOpenDetail = (phrase: Phrase) => {
    setDetailPhrase(phrase);
    setDialogOpen(true);
  };

  const detailScenario = detailPhrase
    ? getScenarioById(detailPhrase.scenarioId)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
          {t.scenario.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.scenario.subtitle}</p>
      </div>

      {/* 场景网格 */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
        {/* 全部按钮 */}
        <button
          onClick={() => setSelectedScenario('all')}
          className={cn(
            'flex flex-col gap-2 rounded-2xl p-4 text-left transition-all cursor-pointer',
            selectedScenario === 'all'
              ? 'bg-primary text-primary-foreground shadow-clay-lg'
              : 'bg-card shadow-clay hover:shadow-clay-lg'
          )}
        >
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            selectedScenario === 'all' ? 'bg-white/20' : 'bg-primary/10'
          )}>
            <Icons.LayoutGrid className={cn('h-5 w-5', selectedScenario === 'all' ? 'text-primary-foreground' : 'text-primary')} />
          </div>
          <div>
            <p className="font-heading text-sm">{t.scenario.all}</p>
            <p className="text-xs opacity-70">{phrases.length} {t.scenario.phraseCount}</p>
          </div>
        </button>

        {scenarios.map((sc) => {
          const Icon = (Icons[sc.icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;
          const count = getPhrasesByScenario(sc.id).length;
          const isActive = selectedScenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc.id)}
              className={cn(
                'flex flex-col gap-2 rounded-2xl p-4 text-left transition-all cursor-pointer',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-clay-lg'
                  : 'bg-card shadow-clay hover:shadow-clay-lg'
              )}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : sc.color + '20',
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: isActive ? 'white' : sc.color }}
                />
              </div>
              <div>
                <p className="font-heading text-sm">{sc.name[lang]}</p>
                <p className="text-xs opacity-70">{count} {t.scenario.phraseCount}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 话术列表 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhrases.map((phrase, index) => {
          const sc = getScenarioById(phrase.scenarioId);
          return (
            <div
              key={phrase.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PhraseCard
                phrase={phrase}
                lang={lang}
                scenarioName={sc?.name[lang] ?? ''}
                scenarioColor={sc?.color ?? 'hsl(var(--primary))'}
                onOpen={() => handleOpenDetail(phrase)}
              />
            </div>
          );
        })}
      </div>

      {filteredPhrases.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          {t.scenario.noPhrases}
        </div>
      )}

      <PhraseDetailDialog
        phrase={detailPhrase}
        lang={lang}
        scenarioName={detailScenario?.name[lang] ?? ''}
        scenarioColor={detailScenario?.color ?? 'hsl(var(--primary))'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
