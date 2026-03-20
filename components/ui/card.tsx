"use client";

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'base' | 'elevated' | 'dark' | 'gradient' | 'status';
  statusColor?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'base', statusColor, ...props }, ref) => {
    const styles = {
      base: 'bg-surface-card shadow-card rounded-lg p-4',
      elevated: 'bg-surface-card shadow-raised rounded-lg p-5',
      dark: 'bg-brand-navy-mid rounded-lg p-4 border border-white/10 text-white',
      gradient: 'bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-xl p-5 text-white overflow-hidden',
      status: 'bg-surface-card rounded-lg p-4 shadow-card',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(styles[variant], variant === 'status' && 'border-l-4', className)}
        style={variant === 'status' ? { borderLeftColor: statusColor } : {}}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.ComponentProps<'h3'>) => (
  <h3 className={cn('text-heading text-text-primary dark:text-white', className)} {...props} />
);

const CardDescription = ({ className, ...props }: React.ComponentProps<'p'>) => (
  <p className={cn('text-caption text-text-muted', className)} {...props} />
);

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('pt-0', className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('flex items-center pt-4', className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
