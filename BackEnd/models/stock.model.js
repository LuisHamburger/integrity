let stocks = require('../data/stocks')

const { writeDataToFile } = require('../helper')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(stocks)
    })
}

function findBySymbol(symbol) {
    return new Promise((resolve, reject) => {
        const stock = stocks.find((s) => s.symbol.toLowerCase() === symbol.toLowerCase())
        resolve(stock)
    })
}

function create(stock) {
    return new Promise((resolve, reject) => {
        stocks.push(stock)
        writeDataToFile('./data/stocks.json', stocks);
        resolve(stock)
    })
}

function update(symbol, stock) {
    return new Promise((resolve, reject) => {
        const index = stocks.findIndex((s) => s.symbol.toLowerCase() === symbol.toLowerCase())
        stocks[index] = { symbol, ...stock }
        writeDataToFile('./data/stocks.json', stocks);
        resolve(stocks[index])
    })
}

function remove(symbol) {
    return new Promise((resolve, reject) => {
        stocks = stocks.filter((s) => s.symbol.toLowerCase() !== symbol.toLowerCase())
        writeDataToFile('./data/stocks.json', stocks);
        resolve()
    })
}

module.exports = {
    findAll,
    findBySymbol,
    create,
    update,
    remove
}