const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "crypto": require.resolve("crypto-browserify"),
          "buffer": require.resolve("buffer/"),
          "stream": require.resolve("stream-browserify"),
          "process": require.resolve("process/browser")
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser'
        })
      ]
    }
  }
}; 