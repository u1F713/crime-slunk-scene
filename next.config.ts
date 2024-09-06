import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'
import type {NextConfig} from 'next'

const config: NextConfig = {}
const withVanillaExtract = createVanillaExtractPlugin()

export default withVanillaExtract(config)
