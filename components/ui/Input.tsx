import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-stone-600 tracking-wide uppercase">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-white border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-stone-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink',
            error ? 'border-red-400' : 'border-stone-200 hover:border-stone-300',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-stone-400">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-stone-600 tracking-wide uppercase">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-white border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-stone-400 resize-none',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink',
            error ? 'border-red-400' : 'border-stone-200 hover:border-stone-300',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-stone-400">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
