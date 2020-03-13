const express = require('express')
const bodyParser = require("body-parser");

const { routes } = require("./routes/routes");

require("dotenv").config();

const port = process.env.port || 8000
const app = express()

app
    .set('view engine', 'ejs')
    .set('views', 'docs/views')

    .use(express.static(__dirname + '/static'))

    .use('/', routes)

app.listen(port, function() {
    console.log(`Application started on port: ${port}`);
    console.log(`open the page -> http://localhost:${port}`)
});