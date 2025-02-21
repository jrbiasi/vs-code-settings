/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@langs': path.resolve(__dirname, 'src', 'langs'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@service': path.resolve(__dirname, 'src', 'service'),
    },
    configure: (webpackConfig, { env }) => {
      // Desativa source maps em produção

      if (env === 'production') {
        webpackConfig.devtool = false
      }

      // Outras configurações do Webpack que você já tem
      webpackConfig.ignoreWarnings = [/Failed to parse source map/]

      // Polyfills para Webpack 5 (resolvendo erro de módulos ausentes)
      webpackConfig.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url/'),
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer/'),
        vm: require.resolve('vm-browserify'),
        process: require.resolve('process/browser.js'),
      }

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        })
      )

      // Desabilita source maps para dependências problemáticas
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/(superstruct|@safe-global|@walletconnect)/, // Adicione os pacotes que causam o erro
        ],
      })

      return webpackConfig
    },
  },
}
