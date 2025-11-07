import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://fuchsia-absolute-porcupine-16.mypinata.cloud/ipfs/**')],
  },
}

export default nextConfig
