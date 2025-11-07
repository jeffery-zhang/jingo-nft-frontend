'use client'

import { useRef, useState } from 'react'

import { pinata } from '../pinata'
import Image from 'next/image'

interface IPros {
  value?: string
  onChange?: (value: string) => void
}

export function ImageUploader({ value, onChange }: IPros) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState<string>(value ?? '')
  const [showMask, setShowMask] = useState<boolean>(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    const file = e.target.files?.[0]
    if (file) onUpload(file)
  }

  const onUpload = async (file: File) => {
    try {
      const upload = await pinata.upload.public.file(file)
      if (upload && upload.cid) {
        retrieveImageUrl(upload.cid)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const retrieveImageUrl = async (cid: string) => {
    try {
      const url = await pinata.gateways.public.convert(cid)
      if (url) {
        setUrl(url)
        onChange?.(url)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onDelete = () => {
    setUrl('')
    onChange?.('')
  }

  return (
    <div className='relative w-40 h-40 border border-dashed border-base-300'>
      <input ref={inputRef} type='file' accept='image/*' className='invisible absolute' onChange={onFileChange} />
      {url ? (
        <div className='relative w-full h-full' onMouseEnter={() => setShowMask(true)} onMouseLeave={() => setShowMask(false)}>
          <Image src={url} alt='image' fill className='object-cover' />
          <div
            className={`absolute top-0 left-0 w-full h-full bg-neutral opacity-50 flex justify-center items-center gap-4 ${showMask ? 'visible' : 'invisible'}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#ffffff'
              className='size-6 cursor-pointer'
              onClick={onDelete}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
          </div>
        </div>
      ) : (
        <span className='flex justify-center items-center w-full h-full text-5xl text-neutral-content cursor-pointer' onClick={() => inputRef.current?.click()}>
          +
        </span>
      )}
    </div>
  )
}
