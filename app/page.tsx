'use client'
import CodeEditor from '@/components/CodeEditor'
import { SelectLanguage } from '@/components/SelectLanguage'
import { ThemeToggle } from '@/components/theme-toggle'
import { CODE_SNIPPETS, type Language } from '@/lib/constants/Languages'
import { Code2 } from 'lucide-react'
import { useCallback, useState, useMemo } from 'react'

export default function Home() {
  const [language, setLanguage] = useState<Language>('javascript')
  const initialCode = useMemo(() => CODE_SNIPPETS[language], [language])
  const [code, setCode] = useState<string>(initialCode)

  const handleLanguageChange = useCallback((selectedLanguage: Language) => {
    setLanguage(selectedLanguage)
    setCode(CODE_SNIPPETS[selectedLanguage])
  }, [])
  return (
    <div className='min-h-screen w-full'>
      <header className='border-b  backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
        <div className='flex items-center justify-between h-16 px-4 w-full max-w-[2000px] mx-auto'>
          <div className='flex items-center gap-4'>
            <div className='bg-primary/10 p-2 rounded-lg'>
              <Code2 className='h-6 w-6 text-primary' />
            </div>
            <h1 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60'>
              Code Editor Pro
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            <SelectLanguage
              onSelect={handleLanguageChange}
              language={language}
            />

            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className='pt-4'>
        <CodeEditor
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          key={language}
        />
      </div>
    </div>
  )
}
