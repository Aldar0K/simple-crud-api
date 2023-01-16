import * as path from 'path';
import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        exclude: ['/node_modules/'],
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
  plugins: [new CleanWebpackPlugin()]
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
