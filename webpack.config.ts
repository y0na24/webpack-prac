import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

type Mode = 'production' | 'development'

interface EnvVariables {
  mode: Mode
  port: number
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development'

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      isDev && new webpack.ProgressPlugin()
    ].filter(Boolean),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? {
      port: env.port ?? 8000,
      open: true
    } : undefined
  }

  return config
}
