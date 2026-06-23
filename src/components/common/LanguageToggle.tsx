import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/use-i18n';

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="gap-1.5 cursor-pointer text-muted-foreground hover:text-primary"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {lang === 'zh' ? 'EN' : '中'}
      </span>
    </Button>
  );
}
