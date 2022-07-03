const http = require('http')

const { getStocks, createStock, updateStock, deleteStock } = require('./controllers/stocks.controller');

const server = http.createServer((req, res) => {

    setearHeader(res);

    const { url, method } = req;

    if (url === '/api/stocks' && method === 'GET') {

        getStocks(req, res);

    } else if (url.match(/\/api\/newStock\/\w+/) && (method === 'POST' || (method === 'OPTIONS' && req.rawHeaders.includes('POST')))) {

        const symbol = url.split('/')[3]

        createStock(req, res, symbol)

    } else if (url.match(/\/api\/putStock\/\w+/) && (method === 'PUT' || (method === 'OPTIONS' && req.rawHeaders.includes('PUT')))) {

        const symbol = url.split('/')[3]

        updateStock(req, res, symbol)

    } else if (url.match(/\/api\/deleteStock\/\w+/) && (method === 'DELETE' || (method === 'OPTIONS' && req.rawHeaders.includes('DELETE')))) {

        const symbol = url.split('/')[3]

        deleteStock(req, res, symbol)

    } else {

        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: false, error: 'Ruta no encontrada' }))

    }
})

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;


const setearHeader = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');
}