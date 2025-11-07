import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export function Header() {
  return (
    <header className='navbar bg-base-100 shadow-sm'>
      <div className='flex-none'>
        <Link href='/'>Jingo NFTs</Link>
      </div>
      <div className='flex-1'></div>
      <div className='flex-none'>
        <ConnectButton />
      </div>
    </header>
  )
}
