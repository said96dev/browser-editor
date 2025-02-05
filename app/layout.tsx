import type { Metadata } from 'next'

// These styles apply to every route in the application
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'Online code editor with multiple language support',
  icons: {
    icon: '/favicon.ico', // Hier das Favicon einfügen
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-background text-foreground'>
        <div className='min-h-screen  px-4 sm:px-6 lg:px-8'>
          {children}
          <Toaster expand visibleToasts={5} richColors />
        </div>
      </body>
    </html>
  )
}
