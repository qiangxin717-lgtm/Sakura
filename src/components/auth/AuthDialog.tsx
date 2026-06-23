import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { GithubButton } from './GithubButton';
import { useI18n } from '@/hooks/use-i18n';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthDialog({ open, onOpenChange, defaultTab = 'login' }: AuthDialogProps) {
  const { t } = useI18n();
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-heading text-xl">
            {t.auth.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t.auth.subtitle}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="cursor-pointer">
              {t.auth.login}
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              {t.auth.signup}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <LoginForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <SignupForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>

        {/* 分隔线 */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              {t.auth.or}
            </span>
          </div>
        </div>

        {/* GitHub 登录 */}
        <GithubButton onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
