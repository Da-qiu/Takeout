const express = require('express')
const appData = require('./data.json')

const app = express()
const apiRouter = express.Router()
app.use('/api', apiRouter)

let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: true,
    runtimeCompiler: true,
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null,
        before(app) {
            app.get('/api/seller', (req, res) => {
                res.json({
                    errno: 0,
                    data: seller
                })
            })
            app.get('/api/goods', (req, res) => {
                res.json({
                    errno: 0,
                    data: goods
                })
            })
            app.get('/api/ratings', (req, res) => {
                res.json({
                    errno: 0,
                    data: ratings
                })
            })
        }
    }
}
