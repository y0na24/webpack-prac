import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'
import { loader } from 'mini-css-extract-plugin'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development'

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev
          ? '[path][name]__[local]--[hash:base64:3]'
          : '[hash:base64:8]'
      }
    }
  }

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }

  const stylesLoader = {
    test: /\.s[ac]ss$/i,
    use: [isDev ? 'style-loader' : loader, cssLoaderWithModules, 'sass-loader']
  }

  return [tsLoader, stylesLoader]
}
