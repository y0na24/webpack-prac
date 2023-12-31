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
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }

  const stylesLoader = {
    test: /\.s[ac]ss$/i,
    use: [isDev ? 'style-loader' : loader, cssLoaderWithModules, 'sass-loader']
  }

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  const svgrLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                //чтоб мы могли изменят цвет с помощью свойства color
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }

  return [tsLoader, stylesLoader, assetsLoader, svgrLoader]
}
