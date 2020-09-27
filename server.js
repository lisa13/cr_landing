// Get dependencies
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const compression = require("compression");

const bodyParser = require("body-parser");
const app = express();

const credentials = {
    key: fs.readFileSync(path.resolve(`${__dirname}/certs/server.key`)),
    cert: fs.readFileSync(path.resolve(`${__dirname}/certs/server.pem`))
};

app.use(compression());

const server = https.createServer(credentials, app);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, "")));

// Routing
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


/**
 * Get port from environment and store in Express.
 */
const port = 4200;
app.set("port", port);

/**
 * Listen on provided port, on all network interfaces.
 *
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));