import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'
import { address, abi } from './contract'

export const config = getDefaultConfig({
  appName: 'Jingo NFTs',
  projectId: process.env.NEXT_PUBLIC_PRODUCT_ID ?? '',
  chains: [mainnet, sepolia, hardhat],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

export const contractConfig = {
  address,
  abi,
} as const
