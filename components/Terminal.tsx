'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'

type Props = {
  output: string[]
  isError: boolean
}

const Terminal = memo(({ output, isError }: Props) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const [isTerminalReady, setIsTerminalReady] = useState(false)

  useEffect(() => {
    if (!terminalRef.current) return

    // Initialize xterm.js
    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        cursor: '#f7768e',
      },
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 14,
      lineHeight: 1.3,
      letterSpacing: 0,
      scrollback: 5000,
      scrollSensitivity: 1,
    })

    // Add addons
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.loadAddon(new WebLinksAddon())

    // Mount terminal
    term.open(terminalRef.current)
    xtermRef.current = term
    fitAddonRef.current = fitAddon

    // Fit the terminal to its container
    setTimeout(() => {
      fitAddon.fit()
      setIsTerminalReady(true)
    }, 0)

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [])

  // Update terminal content when output changes
  useEffect(() => {
    if (!xtermRef.current || !isTerminalReady) return

    const term = xtermRef.current
    term.clear()

    if (output.length === 0) {
      term.write(
        '\r\n\x1b[3m Click "Run Code" to see the output here \x1b[0m\r\n'
      )
      return
    }

    output.forEach((line) => {
      const color = isError ? '\x1b[31m' : '\x1b[32m' // Red for errors, green for success
      term.write(`${color}${line}\x1b[0m\r\n`)
    })

    // Ensure the terminal is properly sized after writing content
    if (fitAddonRef.current) {
      fitAddonRef.current.fit()
    }
  }, [output, isError, isTerminalReady])

  return (
    <div className='space-y-4  overflow-hidden'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Terminal Output</h2>
      </div>
      <div
        ref={terminalRef}
        className={`h-[80vh] border-2 border-solid p-4  ${
          isError ? 'border-destructive' : 'border-primary'
        }`}
      />
    </div>
  )
})

Terminal.displayName = 'Terminal'

export default Terminal
