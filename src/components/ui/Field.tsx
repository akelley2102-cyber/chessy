import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  optional?: boolean
  children: ReactNode
}

export function Field({ label, htmlFor, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-bold font-body text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-pencil">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs font-body text-tomato" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
