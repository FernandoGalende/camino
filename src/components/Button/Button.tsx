import { type ButtonHTMLAttributes, type ReactNode } from 'react'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Button label text */
  children: ReactNode
  /** Icon or element rendered before the label */
  prefix?: ReactNode
  /** Icon or element rendered after the label */
  suffix?: ReactNode
}

const variantStyles: Record<string, string> = {
  primary: [
    'bg-[var(--color-bg-interactive-primary-default)]',
    'text-[var(--color-text-interactive-primary-default)]',
    'hover:bg-[var(--color-bg-interactive-primary-hover)]',
    'active:bg-[var(--color-bg-interactive-primary-pressed)]',
    'focus-visible:ring-[var(--color-border-focus)]',
    'disabled:bg-[var(--color-bg-interactive-primary-dissabled)]',
  ].join(' '),

  secondary: [
    'bg-[var(--color-bg-interactive-secondary-default)]',
    'text-[var(--color-text-interactive-seconary-default)]',
    'hover:bg-[var(--color-bg-interactive-secondary-hover)]',
    'active:bg-[var(--color-bg-interactive-secondary-pressed)]',
    'focus-visible:ring-[var(--color-border-focus)]',
    'disabled:bg-[var(--color-bg-interactive-secondary-dissabled)]',
  ].join(' '),

  outline: [
    'border-2 border-[var(--color-border-primary)]',
    'text-[var(--color-text-interactive-ghost-default)]',
    'hover:bg-[var(--color-bg-interactive-neutral-hover)]',
    'active:bg-[var(--color-bg-interactive-neutral-pressed)]',
    'focus-visible:ring-[var(--color-border-focus)]',
    'disabled:border-[var(--color-neutral-600)] disabled:text-[var(--color-text-interactive-primary-dissable)]',
  ].join(' '),

  ghost: [
    'text-[var(--color-text-interactive-ghost-default)]',
    'hover:bg-[var(--color-bg-interactive-neutral-hover)]',
    'active:bg-[var(--color-bg-interactive-neutral-pressed)]',
    'focus-visible:ring-[var(--color-border-focus)]',
    'disabled:text-[var(--color-text-interactive-primary-dissable)]',
  ].join(' '),
}

const sizeStyles: Record<string, string> = {
  lg: 'h-[58px] px-[var(--padding-xl)] gap-[var(--gap-sm)] rounded-[var(--radius-lg)]',
  md: 'h-[38px] px-[var(--padding-lg)] gap-[var(--gap-xs)] rounded-[var(--radius-md)]',
  sm: 'h-[32px] px-[var(--padding-md)] gap-[var(--gap-xs)] rounded-[var(--radius-md)]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  prefix,
  suffix,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center overflow-clip',
        'font-[family-name:var(--typography-fontfamily-primary)] font-[var(--typography-fontweight-bold)]',
        'text-[length:var(--typography-fontsize-300)] leading-[var(--typography-lineheight-300)]',
        'tracking-[var(--typography-letterspacing-xs)]',
        'transition-colors duration-150 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {prefix && <span className="shrink-0 size-[24px] flex items-center justify-center">{prefix}</span>}
      <span>{children}</span>
      {suffix && <span className="shrink-0 size-[24px] flex items-center justify-center">{suffix}</span>}
    </button>
  )
}
