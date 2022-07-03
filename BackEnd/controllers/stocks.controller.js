const Stock = require('../models/stock.model')

const { getStockData } = require('../helper')



async function getStocks(req, res) {
    try {
        const stocks = await Stock.findAll()

        res.writeHead(200)
        res.end(JSON.stringify(stocks))

    } catch (error) {
        console.log(error)
        res.writeHead(404)
        return res.end(JSON.stringify({
            ok: false,
            error: error.message
        }))
    }
}

async function createStock(req, res, symbol) {
    try {

        const existStock = await Stock.findBySymbol(symbol)

        if (existStock) {
            res.writeHead(409)
            return res.end(JSON.stringify({ ok: false, error: 'Stock duplicado' }));
        }

        const stock = await getStockData(symbol);

        const newStock = await Stock.create({ symbol, ...stock })

        res.writeHead(201)
        return res.end(JSON.stringify(newStock))

    } catch (error) {
        console.log(error);
        res.writeHead(404)
        return res.end(JSON.stringify({
            ok: false,
            error: error.message
        }))
    }
}

async function updateStock(req, res, symbol) {
    try {
        const stock = await Stock.findBySymbol(symbol)

        if (!stock) {
            res.writeHead(404)
            return res.end(JSON.stringify({ message: 'Stock no encontrado' }))
        } else {

            const stockData = await getStockData(symbol);

            const updStock = await Stock.update(symbol, stockData)

            res.writeHead(200)
            return res.end(JSON.stringify(updStock))
        }


    } catch (error) {
        console.log(error)
        res.writeHead(404)
        return res.end(JSON.stringify({
            ok: false,
            error: error.message
        }))
    }
}

async function deleteStock(req, res, symbol) {
    try {
        const stock = await Stock.findBySymbol(symbol)

        if (!stock) {
            res.writeHead(404)
            return res.end(JSON.stringify({ message: 'Stock no encontrado' }))
        } else {
            await Stock.remove(symbol)
            res.writeHead(200)
            res.end(JSON.stringify({ message: `Stock ${symbol} eliminado` }))
        }
    } catch (error) {
        console.log(error)
        res.writeHead(404)
        return res.end(JSON.stringify({
            ok: false,
            error: error.message
        }))
    }
}

module.exports = {
    getStocks,
    createStock,
    updateStock,
    deleteStock
}