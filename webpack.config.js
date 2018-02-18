const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.argv[2] === '-p' || process.argv[2] === '--production';
const contentBlocks = path.resolve(__dirname, './content');
const staticFiles = path.resolve(__dirname, './app/static');
const sourcePath = path.resolve(__dirname, './app/src');
const buildPath = path.resolve(__dirname, './dist');
const bundleFolder = 'js';

const plugins = [
  new CopyWebpackPlugin([
    {
      from: staticFiles,
      to: buildPath
    },
    {
      from: contentBlocks,
      to: `${buildPath}/content`
    }
  ])
];

if (isProd) {
  plugins.push(new CleanWebpackPlugin(buildPath));
}

const config = {
  plugins,
  entry: `${sourcePath}/index.js`,
  output: {
    path: `${buildPath}/${bundleFolder}`,
    filename: 'meltstone-presentation.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: sourcePath
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: buildPath,
    publicPath: `/${bundleFolder}/`,
    historyApiFallback: true
    // open: true
  }
};

module.exports = config;
