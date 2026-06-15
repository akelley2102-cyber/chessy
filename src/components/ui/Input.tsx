import type { InputHTMLAttributes } from 'react'

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        'w-full rounded-md border border-rule bg-card px-3 py-2',
        'text-sm font-body text-ink placeholder:text-pencil',
        'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-enamel',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
