import { Flame, Calendar } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { useStreak } from '@/hooks/use-streak';
import { cn } from '@/lib/utils';

export function StreakCalendar() {
  const { t, lang } = useI18n();
  const { streakData, checkIn, hasCheckedInToday } = useStreak();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  const checkedDays = new Set(
    streakData.history
      .filter((dateStr) => {
        const d = new Date(dateStr);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map((dateStr) => new Date(dateStr).getDate())
  );

  return (
    <div className="rounded-2xl bg-card p-5 shadow-clay">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-heading text-2xl text-foreground">
              {streakData.count}
              <span className="ml-1 text-sm font-body text-muted-foreground">
                {t.home.days}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{t.home.streak}</p>
          </div>
        </div>
        <Calendar className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isChecked = checkedDays.has(day);
          const isToday = day === todayDate;
          return (
            <div
              key={day}
              className={cn(
                'flex aspect-square items-center justify-center rounded-lg text-xs font-medium transition-colors',
                isChecked && 'bg-primary text-primary-foreground',
                !isChecked && isToday && 'border-2 border-primary/40 text-primary',
                !isChecked && !isToday && 'bg-muted/50 text-muted-foreground'
              )}
            >
              {day}
            </div>
          );
        })}
      </div>

      {!hasCheckedInToday && (
        <button
          onClick={checkIn}
          className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer shadow-soft"
        >
          {lang === 'zh' ? '今日打卡' : 'Check In'}
        </button>
      )}
      {hasCheckedInToday && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {lang === 'zh' ? '今日已打卡' : 'Checked in today!'}
        </p>
      )}
    </div>
  );
}
