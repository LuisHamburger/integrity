const http = require('http')
const path = require('path')
const fs = require('fs')


const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';
const SVG_CONTENT_TYPE = 'image/svg+xml';

const PUBLIC_FOLDER = path.join(__dirname, 'public');


const server = http.createServer(async (req, res) => {

    const { url } = req;
    let statusCode = 200;
    let contentType = HTML_CONTENT_TYPE;
    let stream;

    if (url === '/') {

        stream = fs.createReadStream(`${PUBLIC_FOLDER}/index.html`);

    } else if (url.match("\.css$")) {

        contentType = CSS_CONTENT_TYPE;
        stream = fs.createReadStream(`${PUBLIC_FOLDER}${url}`);

    } else if (url.match("\.js$")) {

        contentType = JS_CONTENT_TYPE;
        stream = fs.createReadStream(`${PUBLIC_FOLDER}${url}`);

    } else if (url.match("\.svg$")) {

        contentType = SVG_CONTENT_TYPE;
        stream = fs.createReadStream(`${PUBLIC_FOLDER}${url}`);

    } else {
        statusCode = 404;
    }

    res.writeHead(statusCode, { 'Content-Type': contentType });
    if (stream) stream.pipe(res)
    else return res.end('Not found')
})

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
