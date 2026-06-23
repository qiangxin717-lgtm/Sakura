import { Heart, Lightbulb, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Phrase } from '@/types';
import type { Language } from '@/types';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface PhraseCardProps {
  phrase: Phrase;
  lang: Language;
  scenarioName: string;
  scenarioColor: string;
  onOpen: () => void;
}

export function PhraseCard({ phrase, lang, scenarioName, scenarioColor, onOpen }: PhraseCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(phrase.id);

  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-card p-5 shadow-clay transition-all hover:shadow-clay-lg"
    >
      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: scenarioColor }}
      />
      <div className="mb-3 flex items-center justify-between pl-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
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
            'flex h-8 w-8 items-center justify-center rounded-full transition-all cursor-pointer',
            fav
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
          )}
        >
          <Heart className={cn('h-4 w-4', fav && 'fill-current animate-heart-pop')} />
        </button>
      </div>
      <p className="mb-2 line-clamp-3 pl-2 text-sm leading-relaxed text-foreground">
        {phrase.content[lang]}
      </p>
      <p className="mb-3 line-clamp-1 pl-2 text-xs text-muted-foreground">
        {phrase.context[lang]}
      </p>
      <div className="flex items-center justify-between pl-2">
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {phrase.difficulty === 'beginner'
            ? lang === 'zh' ? '入门' : 'Beginner'
            : phrase.difficulty === 'intermediate'
            ? lang === 'zh' ? '进阶' : 'Intermediate'
            : lang === 'zh' ? '高阶' : 'Advanced'}
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

interface PhraseDetailDialogProps {
  phrase: Phrase | null;
  lang: Language;
  scenarioName: string;
  scenarioColor: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PhraseDetailDialog({
  phrase,
  lang,
  scenarioName,
  scenarioColor,
  open,
  onOpenChange,
}: PhraseDetailDialogProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!phrase) return null;
  const fav = isFavorite(phrase.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: scenarioColor }}
            >
              {scenarioName}
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {phrase.difficulty === 'beginner'
                ? lang === 'zh' ? '入门' : 'Beginner'
                : phrase.difficulty === 'intermediate'
                ? lang === 'zh' ? '进阶' : 'Intermediate'
                : lang === 'zh' ? '高阶' : 'Advanced'}
            </span>
          </div>
          <DialogTitle className="font-heading text-lg">
            {lang === 'zh' ? '话术详情' : 'Phrase Details'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 话术内容 */}
          <div className="rounded-xl bg-primary/5 p-4">
            <p className="font-script text-base text-muted-foreground mb-1">
              {lang === 'zh' ? '高情商这样说' : 'Say it with high EQ'}
            </p>
            <p className="font-body text-base leading-relaxed text-foreground">
              {phrase.content[lang]}
            </p>
          </div>

          {/* 适用场景 */}
          <div>
            <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Lightbulb className="h-4 w-4 text-primary" />
              {lang === 'zh' ? '适用场景' : 'Context'}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {phrase.context[lang]}
            </p>
          </div>

          {/* 为什么这样说 */}
          <div>
            <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Lightbulb className="h-4 w-4 text-accent" />
              {lang === 'zh' ? '为什么这样说' : 'Why Say It This Way'}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {phrase.analysis[lang]}
            </p>
          </div>

          {/* 变体表达 */}
          {phrase.variants[lang].length > 0 && (
            <div>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Lightbulb className="h-4 w-4 text-scenario-campus" />
                {lang === 'zh' ? '变体表达' : 'Variations'}
              </h4>
              <ul className="space-y-1.5">
                {phrase.variants[lang].map((v, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-muted/50 px-3 py-2 text-sm leading-relaxed text-foreground"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 收藏按钮 */}
          <Button
            onClick={() => toggleFavorite(phrase.id)}
            variant={fav ? 'default' : 'outline'}
            className="w-full cursor-pointer"
          >
            <Heart className={cn('mr-2 h-4 w-4', fav && 'fill-current')} />
            {fav
              ? lang === 'zh' ? '已收藏' : 'Saved'
              : lang === 'zh' ? '收藏话术' : 'Save Phrase'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
