"use client";

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white shadow-orange active:brightness-95',
      secondary: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10',
      ghost: 'text-text-secondary border border-[#E2E8F0] hover:bg-surface-base dark:border-white/10 dark:hover:bg-white/5',
      danger: 'bg-danger text-white shadow-card',
      icon: 'rounded-full bg-surface-raised dark:bg-white/10 flex items-center justify-center',
    };

    const sizes = {
      sm: 'h-10 px-4 text-[12px] uppercase tracking-wider',
      md: 'h-[54px] px-6 text-body font-semibold',
      lg: 'h-16 px-8 text-heading',
      xl: 'h-[72px] px-10 text-display-xl',
      icon: 'w-12 h-12',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 0.99 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          'relative flex items-center justify-center rounded-full transition-all disabled:opacity-60 disabled:pointer-events-none active:outline-none focus:outline-none shrink-0',
          variants[variant],
          size === 'icon' ? sizes.icon : sizes[size as keyof typeof sizes],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
