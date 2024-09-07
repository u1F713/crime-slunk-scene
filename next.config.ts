import createBundleAnalyzer from '@next/bundle-analyzer'
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'
import type {NextConfig} from 'next'

const config: NextConfig = {}
const withVanillaExtract = createVanillaExtractPlugin()
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withVanillaExtract(config))
