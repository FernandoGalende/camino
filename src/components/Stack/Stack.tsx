import type { HTMLAttributes, ReactNode } from 'react'

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Flex direction */
  direction?: Direction
  /** Gap between children, mapped to design tokens */
  spacing?: Spacing
  /** Align items (cross axis) */
  align?: Align
  /** Justify content (main axis) */
  justify?: Justify
  /** Whether the stack should wrap */
  wrap?: boolean
  /** Render as a different HTML element */
  as?: 'div' | 'section' | 'nav' | 'ul' | 'ol' | 'main' | 'aside' | 'header' | 'footer'
  children?: ReactNode
}

const directionMap: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
}

const spacingMap: Record<Spacing, string> = {
  none: 'gap-[var(--gap-none)]',
  xs: 'gap-[var(--gap-xs)]',
  sm: 'gap-[var(--gap-sm)]',
  md: 'gap-[var(--gap-md)]',
  lg: 'gap-[var(--gap-lg)]',
  xl: 'gap-[var(--gap-xl)]',
}

const alignMap: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyMap: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

export function Stack({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  as: Component = 'div',
  className = '',
  children,
  ...props
}: StackProps) {
  return (
    <Component
      className={[
        'flex',
        directionMap[direction],
        spacingMap[spacing],
        alignMap[align],
        justifyMap[justify],
        wrap ? 'flex-wrap' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}
