// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
// const path = require('path');

module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: 'development',
  // エントリーポイントの設定
  entry: './main.js',
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: 'index.js',
    // 出力先のパス（絶対パスを指定する必要がある）
    path: __dirname
  },
  module: {
    rules: [
        {
            test: /\.ts$/,
            loader: 'ts-loader'
        }
    ]
  },
  resolve: {
      extensions: ['.ts', '.js']
  }
};