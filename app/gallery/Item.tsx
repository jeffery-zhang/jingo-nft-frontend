import { useEffect, useState } from 'react'
import { MintRecord } from './page'
import Image from 'next/image'

interface IProps {
  record: MintRecord
  onZoomIn: (url: string) => void
}

type JsonType = {
  image: string
  name: string
  description: string
}

export function Item({ record, onZoomIn }: IProps) {
  const [image, setImage] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const getJsonFile = async () => {
    const url = record.tokenURI
    const response = await fetch(url)
    const data: JsonType = await response.json()
    console.log(data)
    setImage(data.image)
    setName(data.name)
    setDescription(data.description)
  }

  useEffect(() => {
    getJsonFile()
  }, [record.tokenURI])

  return (
    <div className='card bg-base-100 w-52 shadow-sm'>
      <figure className='relative w-full h-60 cursor-zoom-in' onClick={() => onZoomIn(image)}>
        {!!image && <Image className='object-cover' src={image} alt={name} fill />}
      </figure>
      <div className='card-body'>
        <h2 className='card-title truncate'>{name}</h2>
        <p className='truncate'>{description}</p>
        <p className='truncate'>{record.to}</p>
        <p>{new Date(Number(record.timestamp) * 1000).toLocaleString()}</p>
      </div>
    </div>
  )
}
