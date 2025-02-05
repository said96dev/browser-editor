import { memo } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  output: string[]
  isError: boolean
}

const Output = memo(({ isError, output }: Props) => {
  return (
    <div className='space-y-4 rounded-lg'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Output</h2>
      </div>
      <ScrollArea
        className={`h-[80vh] border-2 border-solid  p-4 ${
          isError
            ? 'border-destructive bg-destructive/10'
            : 'border-primary bg-primary/10 '
        }`}
      >
        {output.length > 0 ? (
          output.map((line, i) => (
            <pre key={i} className='font-mono text-sm'>
              {line}
            </pre>
          ))
        ) : (
          <p className='text-muted-foreground italic'>
            Click &quot;Run Code&quot; to see the output here
          </p>
        )}
      </ScrollArea>
    </div>
  )
})

Output.displayName = 'Output'

export default Output
