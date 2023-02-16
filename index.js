const http = require("http");
const url = require("url")
const fs = require('fs');

// Config file
const dotenv = require("dotenv")
dotenv.config({ path: `${__dirname}/config.env` })
const slugify = require("slugify")

const dataInserter = require('./module/dataInserter');
const sluger = require('./module/sluger');

// data
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overviewTemplate.html`, "utf-8");
const overviewProductTemplate = fs.readFileSync(`${__dirname}/templates/overviewProductTemplate.html`, "utf-8");
const productTemplate = fs.readFileSync(`${__dirname}/templates/productTemplate.html`, "utf-8");
const products = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"));

// server


const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" })
        res.end(overviewTemplate.replace('{%OVERVIEW%}', products.map((product) => dataInserter(overviewProductTemplate, product)).join('')));

    } else if (pathname === "/product") {
        const productQuery = query.id || sluger(product[0].productName);
        const [product] = products.filter((product) => sluger(product.productName) === productQuery);

        res.writeHead(200, { "Content-type": "text/html" })
        res.end(dataInserter(productTemplate, product));
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
        })
        res.end("<h1 style=''>We do not handle this page</h1>")
    }

});

const port = process.env.PORT

// server listen
server.listen(port, "127.0.0.1", () => {
    console.log(`Server started at ${port}`);
});