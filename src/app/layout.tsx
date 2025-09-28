import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Webly.ia - Criador de Sites com IA',
  description: 'Crie sites incríveis com inteligência artificial em tempo real',
  keywords: ['IA', 'criador de sites', 'web development', 'artificial intelligence'],
  authors: [{ name: 'Webly.ia' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Webly.ia - Criador de Sites com IA',
    description: 'Crie sites incríveis com inteligência artificial em tempo real',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
