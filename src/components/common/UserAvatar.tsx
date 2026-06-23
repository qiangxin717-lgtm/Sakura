import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  avatar?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ name, avatar, size = 'md', className }: UserAvatarProps) {
  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  // 取名字首字母作为头像
  const initial = name?.charAt(0)?.toUpperCase() || '?';
  const colors = [
    'bg-primary/20 text-primary',
    'bg-accent/20 text-accent',
    'bg-scenario-romance/20 text-scenario-romance',
    'bg-scenario-campus/20 text-scenario-campus',
    'bg-scenario-conflict/20 text-scenario-conflict',
  ];
  const colorIndex = (name?.charCodeAt(0) || 0) % colors.length;

  // 如果 avatar 是 URL，显示图片
  if (avatar && avatar.startsWith('http')) {
    return (
      <img
        src={avatar}
        alt={name}
        className={cn(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-heading font-semibold',
        sizes[size],
        colors[colorIndex],
        className
      )}
    >
      {initial}
    </div>
  );
}
