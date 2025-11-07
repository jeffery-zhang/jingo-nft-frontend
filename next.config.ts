import type { NextConfig } from 'next'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

const nextConfig: NextConfig = {
  // cloudflare compability
  output: 'standalone',
  /* config options here */
  images: {
    remotePatterns: [new URL('https://fuchsia-absolute-porcupine-16.mypinata.cloud/ipfs/**')],
  },
}

export default nextConfig
