import webpack, { DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Configuration } from 'webpack'
import { BuildOptions } from './types/types'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const isDev = options.mode === 'development'
  const isProd = options.mode === 'production'

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths.html
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform)
    })
  ]

  if (isDev) {
    // forktscheker-webpack-plugin нужен, чтобы не делать лишние действия во время сборки.
    //Проверка типов будет в отдельном процессе уже после сборки
    plugins.push(
      new webpack.ProgressPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin()
    )
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(options.paths.public, 'locales'),
            to: path.resolve(options.paths.output, 'locales')
          }
        ]
      })
    )
  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
