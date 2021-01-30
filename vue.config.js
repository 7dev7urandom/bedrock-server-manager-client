module.exports = {
    devServer: {
        proxy: {
            '^/upload': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
}