import { useState } from 'react';
import { Heart, Info, RotateCcw } from 'lucide-react';
import type { Phrase } from '@/types';
import type { Language } from '@/types';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface PhraseFlipCardProps {
  phrase: Phrase;
  lang: Language;
  scenarioName: string;
  scenarioColor: string;
}

export function PhraseFlipCard({ phrase, lang, scenarioName, scenarioColor }: PhraseFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(phrase.id);

  return (
    <div className="perspective-1000 w-full">
      <div
        className={cn(
          'relative transform-3d transition-transform duration-700 ease-out cursor-pointer',
          isFlipped && 'rotate-y-180'
        )}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* 正面 - 话术内容 */}
        <div
          className="backface-hidden rounded-3xl bg-card p-6 shadow-clay-lg sm:p-8"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: scenarioColor }}
            >
              {scenarioName}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(phrase.id);
              }}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer',
                fav
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              )}
            >
              <Heart className={cn('h-4 w-4', fav && 'fill-current animate-heart-pop')} />
            </button>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <div
              className="mt-1 h-1 w-12 shrink-0 rounded-full"
              style={{ backgroundColor: scenarioColor }}
            />
            <p className="font-script text-xl text-muted-foreground">
              {lang === 'zh' ? '"高情商这样说"' : '"Say it with high EQ"'}
            </p>
          </div>

          <p className="mb-6 font-body text-lg leading-relaxed text-foreground sm:text-xl">
            {phrase.content[lang]}
          </p>

          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RotateCcw className="h-3 w-3" />
              {lang === 'zh' ? '点击翻转查看解析' : 'Tap to flip for analysis'}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {phrase.difficulty === 'beginner'
                ? lang === 'zh' ? '入门' : 'Beginner'
                : phrase.difficulty === 'intermediate'
                ? lang === 'zh' ? '进阶' : 'Intermediate'
                : lang === 'zh' ? '高阶' : 'Advanced'}
            </span>
          </div>
        </div>

        {/* 背面 - 解析 */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-primary p-6 text-primary-foreground shadow-clay-lg sm:p-8"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" />
            <h3 className="font-heading text-lg">
              {lang === 'zh' ? '为什么这样说' : 'Why Say It This Way'}
            </h3>
          </div>

          <p className="mb-4 text-sm leading-relaxed opacity-90">
            {phrase.analysis[lang]}
          </p>

          <div className="mb-4 rounded-xl bg-white/10 p-3">
            <p className="mb-1 text-xs font-semibold uppercase opacity-70">
              {lang === 'zh' ? '适用场景' : 'Context'}
            </p>
            <p className="text-sm leading-relaxed opacity-90">
              {phrase.context[lang]}
            </p>
          </div>

          {phrase.variants[lang].length > 0 && (
            <div className="rounded-xl bg-white/10 p-3">
              <p className="mb-1.5 text-xs font-semibold uppercase opacity-70">
                {lang === 'zh' ? '变体表达' : 'Variations'}
              </p>
              <ul className="space-y-1">
                {phrase.variants[lang].map((v, i) => (
                  <li key={i} className="text-xs leading-relaxed opacity-90">
                    · {v}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex items-center justify-end">
            <span className="flex items-center gap-1.5 text-xs opacity-70">
              <RotateCcw className="h-3 w-3" />
              {lang === 'zh' ? '点击翻回' : 'Tap to flip back'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
