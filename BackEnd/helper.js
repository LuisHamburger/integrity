const fs = require('fs')
const https = require('https')

const urlApi = "https://cloud.iexapis.com/stable/stock";
const tokenApi = "pk_5e9dc4843efd4b3786682b3064ac82a2";

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}


function getImgStock(symbol) {
    return new Promise((resolve, reject) => {
        try {
            const urlLogo = `${urlApi}/${symbol}/logo?token=${tokenApi}`;
            https.get(urlLogo, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    try {
                        resolve(JSON.parse(data).url)
                    } catch (error) {
                        reject(error)
                    }
                });

            })
        } catch (error) {
            reject(error)
        }
    })
}

function getNamePriceChangeStock(symbol) {
    return new Promise((resolve, reject) => {
        try {
            const urlLogo = `${urlApi}/${symbol}/quote?token=${tokenApi}`;

            https.get(urlLogo, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    try {
                        const stockData = JSON.parse(data);
                        resolve({ nombre: stockData.companyName, precio: stockData.latestPrice, esCambioPositivo: stockData.change > 0 ? true : false })
                    } catch (error) {
                        reject(error);
                    }

                });

            })
        } catch (error) {
            reject(error)
        }
    })
}


async function getStockData(symbol) {
    const img = await getImgStock(symbol);
    const { nombre, precio, esCambioPositivo } = await getNamePriceChangeStock(symbol);

    return {
        img,
        nombre,
        precio,
        esCambioPositivo
    }
}

module.exports = {
    writeDataToFile,
    getPostData,
    getImgStock,
    getStockData
}