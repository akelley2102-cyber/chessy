import { X } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  id?: string
}

/**
 * "Label maker" style tag editor: existing tags render as removable
 * chips, typing and pressing Enter or "," adds a new one.
 */
export function TagInput({ tags, onChange, placeholder, id }: TagInputProps) {
  const [draft, setDraft] = useState('')

  function commitDraft() {
    const value = draft.trim()
    if (value && !tags.includes(value)) {
      onChange([...tags, value])
    }
    setDraft('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitDraft()
    } else if (event.key === 'Backspace' && draft === '' && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag))
  }

  return (
    <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-md border border-rule bg-card px-2 py-1.5 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-enamel">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded bg-enamel-light px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide text-white"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            aria-label={`Remove tag ${tag}`}
            className="rounded-sm hover:opacity-75"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        id={id}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitDraft}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="min-w-[6rem] flex-1 bg-transparent py-1 text-sm font-body text-ink outline-none placeholder:text-pencil"
      />
    </div>
  )
}
