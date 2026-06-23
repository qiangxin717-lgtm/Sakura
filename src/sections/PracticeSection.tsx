import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { practiceQuestions } from '@/data/practice';
import { usePractice } from '@/hooks/use-practice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function PracticeSection() {
  const { t, lang } = useI18n();
  const { record, recordAnswer } = usePractice();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = practiceQuestions[currentIndex];
  const totalQuestions = practiceQuestions.length;

  const isCorrect = useMemo(() => {
    if (!submitted) return null;
    if (question.type === 'choice') {
      return selectedOption === question.answer;
    }
    return fillAnswer.trim() === (question.answer as string);
  }, [submitted, question, selectedOption, fillAnswer]);

  const handleSubmit = () => {
    if (question.type === 'choice' && selectedOption === null) return;
    if (question.type === 'fill-blank' && !fillAnswer.trim()) return;

    setSubmitted(true);
    let correct = false;
    if (question.type === 'choice') {
      correct = selectedOption === question.answer;
    } else {
      correct = fillAnswer.trim() === (question.answer as string);
    }
    recordAnswer(correct);
    setSessionCorrect((prev) => prev + (correct ? 1 : 0));
    setSessionTotal((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFillAnswer('');
      setSubmitted(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setFillAnswer('');
    setSubmitted(false);
    setSessionCorrect(0);
    setSessionTotal(0);
    setCompleted(false);
  };

  if (completed) {
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <div className="rounded-3xl bg-card p-8 text-center shadow-clay-lg animate-scale-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 font-heading text-2xl text-foreground">
            {t.practice.completed}
          </h2>
          <p className="mb-6 text-muted-foreground">
            {sessionCorrect} / {sessionTotal}
          </p>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-heading text-lg text-primary">
              {accuracy}% {t.practice.score}
            </span>
          </div>
          <div>
            <Button onClick={handleRestart} className="w-full cursor-pointer" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.practice.restart}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      {/* 标题 */}
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
          {t.practice.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.practice.subtitle}</p>
      </div>

      {/* 今日进度 */}
      <div className="mb-4 flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
        <div className="flex-1 rounded-xl bg-card p-3 shadow-soft">
          <p className="text-xs text-muted-foreground">{t.practice.todayProgress}</p>
          <p className="font-heading text-lg text-foreground">
            {record.todayAttempted}
            <span className="text-sm text-muted-foreground"> / </span>
            {record.totalAttempted}
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-card p-3 shadow-soft">
          <p className="text-xs text-muted-foreground">{t.practice.correctRate}</p>
          <p className="font-heading text-lg text-primary">
            {record.totalAttempted > 0
              ? Math.round((record.totalCorrect / record.totalAttempted) * 100)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* 题目卡片 */}
      <div
        key={currentIndex}
        className="rounded-2xl bg-card p-5 shadow-clay animate-fade-in-up sm:p-6"
        style={{ animationDelay: '0.1s' }}
      >
        {/* 进度 */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {question.type === 'choice' ? t.practice.choice : t.practice.fillBlank}
          </span>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* 场景描述 */}
        <div className="mb-4 rounded-xl bg-muted/50 p-3">
          <p className="text-sm leading-relaxed text-foreground">
            {question.scenario[lang]}
          </p>
        </div>

        {/* 问题 */}
        <h3 className="mb-4 font-heading text-base text-foreground">
          {question.question[lang]}
        </h3>

        {/* 选择题 */}
        {question.type === 'choice' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const isAnswer = i === question.answer;
              let style = 'border-border bg-background hover:bg-muted/50';

              if (submitted) {
                if (isAnswer) {
                  style = 'border-primary bg-primary/10 text-primary';
                } else if (isSelected) {
                  style = 'border-destructive bg-destructive/10 text-destructive';
                } else {
                  style = 'border-border bg-background opacity-60';
                }
              } else if (isSelected) {
                style = 'border-primary bg-primary/5';
              }

              return (
                <button
                  key={i}
                  onClick={() => !submitted && setSelectedOption(i)}
                  disabled={submitted}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all cursor-pointer',
                    style,
                    !submitted && 'hover:shadow-soft'
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm leading-relaxed">{option[lang]}</span>
                  {submitted && isAnswer && (
                    <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-primary" />
                  )}
                  {submitted && isSelected && !isAnswer && (
                    <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 填空题 */}
        {question.type === 'fill-blank' && (
          <div>
            <div className="mb-3 rounded-xl bg-primary/5 p-4 font-body text-base leading-relaxed text-foreground">
              {question.question[lang].split('____').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="mx-1 inline-block min-w-[80px] border-b-2 border-dashed border-primary px-2 text-center text-primary">
                      {submitted ? question.answer : fillAnswer || '___'}
                    </span>
                  )}
                </span>
              ))}
            </div>
            <Input
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              placeholder={t.practice.enterAnswer}
              disabled={submitted}
              className="cursor-text"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !submitted) handleSubmit();
              }}
            />
          </div>
        )}

        {/* 提交后反馈 */}
        {submitted && (
          <div
            className={cn(
              'mt-4 rounded-xl p-4 animate-scale-in',
              isCorrect ? 'bg-primary/10' : 'bg-destructive/10'
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
              <span
                className={cn(
                  'font-heading text-sm',
                  isCorrect ? 'text-primary' : 'text-destructive'
                )}
              >
                {isCorrect ? t.practice.correct : t.practice.wrong}
              </span>
            </div>
            {!isCorrect && question.type === 'fill-blank' && (
              <p className="mb-2 text-sm text-foreground">
                <span className="text-muted-foreground">{t.practice.correctAnswer}: </span>
                {question.answer as string}
              </p>
            )}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {question.explanation[lang]}
            </p>
          </div>
        )}

        {/* 按钮 */}
        <div className="mt-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              className="w-full cursor-pointer"
              size="lg"
              disabled={
                question.type === 'choice'
                  ? selectedOption === null
                  : !fillAnswer.trim()
              }
            >
              {t.practice.submit}
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full cursor-pointer" size="lg">
              {t.practice.next}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
