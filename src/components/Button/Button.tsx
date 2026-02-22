import { type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  label: string
}

const variantStyles = {
  primary:
    'bg-primary-400 text-neutral-100 hover:bg-primary-500 focus-visible:ring-primary-500',
  secondary:
    'bg-secondary-200 text-neutral-900 hover:bg-secondary-500 focus-visible:ring-secondary-500',
  outline:
    'border-2 border-primary-500 text-primary-900 hover:bg-primary-100 focus-visible:ring-primary-500',
  ghost:
    'text-neutral-700 hover:bg-neutral-300 focus-visible:ring-neutral-500',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center font-medium font-primary',
        'rounded-md transition-colors duration-150 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {label}
    </button>
  )
}
