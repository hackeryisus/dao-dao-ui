import clsx from 'clsx'
import { ComponentType } from 'react'

export interface IconButtonifierProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'xl' | 'lg' | 'sm' | 'xs'
  Icon: ComponentType<{ className: string }>
  disabled?: boolean
  className?: string
  iconClassName?: string
}

export const getIconButtonifiedClassNames = ({
  variant = 'primary',
  size = 'default',
  disabled,
  className,
}: Omit<IconButtonifierProps, 'icon'>) =>
  clsx(
    'flex justify-center items-center focus:outline-2 transition-all focus:outline-focus',
    // Sizes.
    {
      'p-1 w-5 h-5 rounded-md': size === 'xs',
      'p-1.5 w-6 h-6 rounded-md': size === 'sm',
      'p-2 w-8 h-8 rounded-md': size === 'default',
      'p-3 w-10 h-10 rounded-full': size === 'lg',
      'p-[0.625rem] w-10 h-10 rounded-full': size === 'xl',
    },

    // Primary variant
    variant === 'primary' && {
      'text-white': true,
      // Default
      'bg-btn hover:bg-btn-hover active:bg-btn-pressed': !disabled,
      // Disabled
      'bg-btn-disabled': disabled,
    },
    // Secondary variant
    variant === 'secondary' && {
      'text-dark': true,
      // Default
      'text-dark bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed':
        !disabled,
      // Disabled
      'bg-btn-secondary-disabled': disabled,
    },
    // Ghost variant
    variant === 'ghost' && {
      'text-dark bg-transparent': true,
      // Default
      'hover:bg-btn-ghost-hover active:bg-btn-secondary': !disabled,
    },
    className
  )

export const IconButtonifiedChildren = ({
  Icon,
  iconClassName,
}: Pick<IconButtonifierProps, 'Icon' | 'iconClassName'>) => (
  <Icon className={clsx('w-full h-full', iconClassName)} />
)