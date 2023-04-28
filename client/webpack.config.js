const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack'
      }),

      // new GenerateSW(),
      new WebpackPwaManifest({
        name:'JATE',
        short_name:'JATE',
        description:'Craft notes and code snippets!',
        background_color: 'black',
        theme_color: '#7eb4e2',
        start_url:'./',
        publicPath:'./',
        fingerprints: false,
        icons: [
          {
            src: './src/images/logo.png',
            sizes: [96, 128, 192, 256, 384, 512],
            purpose:"any maskable",
            destination: "./assets/icons",
          },
        ],
      }),
      new InjectManifest({
        swSrc:"./src-sw.js",
        swDest:"src-sw.js"
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use:{
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
