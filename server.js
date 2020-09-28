// Get dependencies
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const compression = require("compression");
const client = require("@sendgrid/mail");

const mail = {
    apiKey: "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",
    from: "info@chain-reaction.io"
};
client.setApiKey(mail.apiKey);

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

app.post("/contact", async (req, res) => {
    try {
        const {name, email, company} = req.body;

        if (!name) {
            res.status(400).json({message: "name_required"});
        }

        if (!email) {
            res.status(400).json({message: "email_required"});
        }

        if (!company) {
            res.status(400).json({message: "company_required"});
        }


        const options = {
            to: mail.from,
            from: mail.from,
            subject: "Contact Us",
            html: `
                <h1>Contact</h1>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Company: ${company}</p>
            `
        };

        await client.send(options);

        res.json({message: "email_sent"});
    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 400).json({message: err.message || err});
    }
})


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
