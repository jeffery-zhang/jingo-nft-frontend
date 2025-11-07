import type { Metadata } from 'next'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './Providers'
import { Menu } from './components/Menu'
import { Header } from './components/Header'

export const metadata: Metadata = {
  title: 'JINGO NFTs',
  description: 'Discover Jingo NFTs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <div className='w-screen h-screen overflow-hidden flex flex-col'>
            <Header />
            <main className='container mx-auto flex-1 flex'>
              <Menu />
              <div className='flex-1 h-full overflow-hidden'>{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
