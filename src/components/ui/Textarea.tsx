import type { TextareaHTMLAttributes } from 'react'

export function Textarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
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
