import { NavLink } from 'react-router-dom';
import { Home, Layers, Dumbbell, Users, User } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const { t } = useI18n();

  const navItems = [
    { to: '/', icon: Home, label: t.nav.home },
    { to: '/scenarios', icon: Layers, label: t.nav.scenarios },
    { to: '/practice', icon: Dumbbell, label: t.nav.practice },
    { to: '/community', icon: Users, label: t.nav.community },
    { to: '/profile', icon: User, label: t.nav.profile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-background/90 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer min-w-[44px] min-h-[44px] justify-center',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
