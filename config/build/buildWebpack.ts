import path from 'path'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { Configuration } from 'webpack'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types'

export function buildWebpack(options: BuildOptions): Configuration {
  const isDev = options.mode === 'development'

  return {
    mode: options.mode ?? 'development',
    entry: options.paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: options.paths.output,
      clean: true
    },
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined
  }
}
