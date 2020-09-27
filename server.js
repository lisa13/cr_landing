// Get dependencies
const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");

const bodyParser = require("body-parser");
const app = express();

const server = http.createServer(app);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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