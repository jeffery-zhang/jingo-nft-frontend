'use client'

import { useReadContract } from 'wagmi'
import { contractConfig } from '../wagmi'
import { useEffect, useState } from 'react'
import { Item } from './Item'
import Image from 'next/image'

export type MintRecord = {
  to: string
  tokenId: string
  tokenURI: string
  timestamp: string
}

export default function Gallery() {
  // @ts-ignore
  const { data, error, isPending } = useReadContract({
    ...contractConfig,
    functionName: 'viewAllMintedNFTs',
  })

  const [zoomIn, setZoomIn] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')

  const onZoomIn = (url: string) => {
    setImage(url)
    setZoomIn(true)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='p-5 h-full'>
      <div className='max-h-full overflow-y-auto flex flex-wrap gap-4'>
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className='flex w-52 flex-col gap-4'>
                <div className='skeleton h-32 w-full'></div>
                <div className='skeleton h-4 w-28'></div>
                <div className='skeleton h-4 w-full'></div>
                <div className='skeleton h-4 w-full'></div>
                <div className='skeleton h-4 w-full'></div>
              </div>
            ))
          : error || (data as MintRecord[]).length === 0
          ? 'Empty'
          : (data as MintRecord[])?.map(record => <Item key={record.tokenId} record={record} onZoomIn={onZoomIn} />)}
      </div>
      <div className={`fixed left-0 top-0 cursor-zoom-out bg-[rgba(0,0,0,.5)] ${zoomIn ? 'w-screen h-screen' : 'w-0 h-0'}`} onClick={() => setZoomIn(false)}>
        {image && <Image src={image} fill className='object-contain' alt={image} />}
      </div>
    </div>
  )
}
