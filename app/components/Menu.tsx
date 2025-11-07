'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const menuItem = [
  {
    name: 'Minting',
    path: '/minting',
  },
  {
    name: 'Gallery',
    path: '/gallery',
  },
]

export function Menu() {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className='border-r border-base-300 w-1/3'>
      <ul>
        {menuItem.map(item => (
          <li className='text-right p-4' key={item.name}>
            <div className={`link text-accent-content ${pathname === item.path ? '' : ' link-hover'}`}>
              <Link href={item.path}>{item.name}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
