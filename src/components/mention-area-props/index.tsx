"use client"

import { useDebounce } from "@/hooks/use-debounce"
import { searchUsers } from "@/services/user.service"
import { User } from "@/types/user.types"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"
import { useRef, useState } from "react"
import { Textarea } from "../ui/textarea"

interface MentionTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MentionTextarea({ value, onChange, placeholder, className }: MentionTextareaProps) {
  const [mentionQuery, setMentionQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [mentionStart, setMentionStart] = useState(-1)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const debouncedQuery = useDebounce(mentionQuery, 300)

  const { data: users = [] } = useQuery({
    queryKey: ['mentionSearch', debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  })

  const suggestions = users.slice(0, 3)

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value
    const cursor = e.target.selectionStart

    onChange(val)

    const textBeforeCursor = val.slice(0, cursor)
    const match = textBeforeCursor.match(/@(\w*)$/)

    if (match) {
      setMentionQuery(match[1])
      setMentionStart(cursor - match[0].length)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
      setMentionQuery('')
    }
  }

  function handleSelect(username: string) {
    const before = value.slice(0, mentionStart)
    const after = value.slice(textareaRef.current?.selectionStart ?? 0)
    const newValue = `${before}@${username} ${after}`
    onChange(newValue)
    setShowDropdown(false)
    setMentionQuery('')
    textareaRef.current?.focus()
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((user: User) => (
            <button
              key={user.id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(user.name)
              }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <UserIcon className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}