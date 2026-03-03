import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'green' | 'red';
}

export function LiveIndicator({ 
  size = 'md', 
  showText = true,
  className,
  variant = 'red'
}: LiveIndicatorProps) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className={cn(
        "rounded-full animate-live-pulse-red",
        sizeClasses[size],
        variant === 'red' ? 'bg-[#ef4444]' : 'bg-[#22c55e]'
      )} />
      {showText && (
        <span className={cn(
          "font-bold text-xs uppercase tracking-wider",
          variant === 'red' ? 'text-[#ef4444]' : 'text-[#22c55e]'
        )}>
          LIVE
        </span>
      )}
    </div>
  );
}
