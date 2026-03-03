import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'none' | 'blue' | 'purple';
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  glow = 'none'
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "bg-[#16181c]/80 backdrop-blur-xl border border-white/[0.08] rounded-xl",
        "shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
        hover && "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        glow === 'blue' && "hover:shadow-[0_0_30px_rgba(29,155,240,0.2)]",
        glow === 'purple' && "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
}
