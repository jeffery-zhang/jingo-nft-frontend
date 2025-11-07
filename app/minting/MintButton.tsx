import { ConnectButton } from '@rainbow-me/rainbowkit'

interface IProps {
  txHash?: string
  isUploading: boolean
  isPending: boolean
  isMinting: boolean
  isConnected: boolean
  isSuccess: boolean
  disabled: boolean
  onMint: () => void
}

export function MintButton({ txHash, isUploading, isPending, isMinting, isConnected, isSuccess, disabled, onMint }: IProps) {
  switch (true) {
    case !isConnected:
      return (
        <div className='mt-5'>
          <ConnectButton />
        </div>
      )
    case isSuccess && !!txHash:
      return <p className='mt-5'>Transaction Hash: {txHash}</p>
    case isUploading:
      return (
        <button className='btn mt-5'>
          <span className='loading loading-spinner'></span>
          Uploading
        </button>
      )
    case isPending:
      return (
        <button className='btn mt-5'>
          <span className='loading loading-spinner'></span>
          Pending
        </button>
      )
    case isMinting:
      return (
        <button className='btn mt-5'>
          <span className='loading loading-spinner'></span>
          Minting
        </button>
      )
    default:
      return (
        <button className='btn btn-primary mt-5' disabled={disabled} onClick={onMint}>
          Mint
        </button>
      )
  }
}
