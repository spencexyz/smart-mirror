module.exports = {
  dev: {
    options: {
      script: './index.js'
    }
  },
  prod: {
    options: {
      script: './index.js',
      node_env: 'production'
    }
  }
}
