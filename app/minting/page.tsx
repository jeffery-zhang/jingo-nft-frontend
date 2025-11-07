'use client'

import { useState } from 'react'
import { ImageUploader } from '../components/ImageUploader'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import CryptoJS from 'crypto-js'
import { pinata } from '../pinata'
import { contractConfig } from '../wagmi'
import { MintButton } from './MintButton'

export default function Minting() {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const account = useAccount()
  const isConnected = account.isConnected
  const formHasFilled = name.length > 0 && description.length > 0 && image.length > 0

  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isMinting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // 组合元数据并生成json文件
  const uploadJsonFile = async () => {
    if (!formHasFilled) return
    if (!isConnected) return
    // 用户地址
    const address = account.address
    const timestamp = Date.now()
    // SHA256 指纹
    const hash = CryptoJS.SHA256(image).toString()

    const attributes = [
      { trait_type: 'SHA256 fingerprint', value: hash.slice(0, 16) },
      { trait_type: 'owner', value: address },
      { trait_type: 'time', value: timestamp },
    ]

    const metadata = {
      image,
      name,
      description,
      attributes,
    }

    const file = new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' })
    try {
      setIsUploading(true)
      const upload = await pinata.upload.public.file(file)
      if (upload.cid) {
        const url = await pinata.gateways.public.convert(upload.cid)
        console.log(url)
        mint(url)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  // 调用智能合约开始铸造
  const mint = async (url: string) => {
    if (!url) return
    writeContract({
      ...contractConfig,
      functionName: 'mintNFT',
      args: [url],
    })
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setImage('')
  }

  return (
    <div className='p-5'>
      <fieldset className='fieldset'>
        <legend className='fieldset-legend'>Name Your Image</legend>
        <input className='input' type='text' placeholder='Image Name' onChange={e => setName(e.target.value)} />
      </fieldset>
      <fieldset className='fieldset'>
        <legend className='fieldset-legend'>Describe Your Image</legend>
        <input className='input' type='text' placeholder='Image Description' onChange={e => setDescription(e.target.value)} />
      </fieldset>
      <fieldset className='fieldset'>
        <legend className='fieldset-legend'>Upload Image</legend>
        <ImageUploader onChange={(url: string) => setImage(url)} />
      </fieldset>
      <MintButton
        txHash={hash}
        isUploading={isUploading}
        isPending={isPending}
        isMinting={isMinting}
        isConnected={isConnected}
        isSuccess={isSuccess}
        disabled={!formHasFilled}
        onMint={uploadJsonFile}
      />
    </div>
  )
}
