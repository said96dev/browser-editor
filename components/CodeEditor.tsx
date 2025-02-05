'use client'
import { useState, useRef, useCallback, memo } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import type { Language } from '@/lib/constants/Languages'
import Output from './Output'
import { Button } from './ui/button'
import { RefreshCwOff, Play, Loader2 } from 'lucide-react'
import { executeCode } from '@/app/api'
import { toast } from 'sonner'

type Props = {
  language: Language
  setLanguage: (language: Language) => void
  code: string
  setCode: (code: string) => void
}

const CodeEditor = ({ language, setCode, code }: Props) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [output, setOutput] = useState<string[]>([])

  const runCode = useCallback(async () => {
    if (!editorRef.current) return
    const sourceCode = editorRef.current.getValue()
    if (!sourceCode) return

    setIsLoading(true)
    setOutput([])
    try {
      const { run: result } = await executeCode(language, sourceCode)
      const outputLines = result.output.split('\n')
      setOutput(outputLines)
      setIsError(!!result.stderr)
      if (result.stderr) {
        toast.error('An error occurred while running the code.', {
          description: result.stderr,
          duration: 6000,
          icon: <RefreshCwOff className='h-4 w-4' />,
        })
      } else {
        toast.success('Code executed successfully!', {
          duration: 3000,
          icon: <Play className='h-4 w-4' />,
        })
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred.', {
        description: 'Unable to run code',
        duration: 6000,
        icon: <RefreshCwOff className='h-4 w-4' />,
      })
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [editorRef, language])

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='flex flex-col space-y-4'>
        <Button
          onClick={runCode}
          disabled={isLoading}
          className='flex items-center space-x-2 w-fit'
        >
          {isLoading ? (
            <>
              Running... <Loader2 className='w-4 h-4 ml-2 animate-spin' />
            </>
          ) : (
            <>
              Run Code <Play className='w-4 h-4 ml-2' />
            </>
          )}
        </Button>
        <div className=' overflow-hidden'>
          <Editor
            height='80vh'
            theme='vs-dark'
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />
        </div>
      </div>
      <div className='rounded-lg'>
        <Output isError={isError} output={output} />
      </div>
    </div>
  )
}

export default memo(CodeEditor)
