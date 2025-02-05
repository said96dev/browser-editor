'use client'
import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Language, LANGUAGE_VERSIONS } from '@/lib/constants/Languages'
type SelectLanguageProps = {
  onSelect: (lang: Language) => void
  language: Language
}
export function SelectLanguage({ onSelect, language }: SelectLanguageProps) {
  const handleValueChange = useCallback(
    (value: string) => {
      onSelect(value as Language)
    },
    [onSelect]
  )

  return (
    <div className='space-y-2'>
      <Select value={language} onValueChange={handleValueChange}>
        <SelectTrigger id='language-select' className='w-[180px]'>
          <SelectValue placeholder='Select a Language' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
              <SelectItem key={lang} value={lang}>
                {lang} ({version})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
