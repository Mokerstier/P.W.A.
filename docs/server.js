const express = require('express')
const bodyParser = require("body-parser");

const { routes } = require("./routes/routes");

require("dotenv").config();


const app = express()

app
    .set('view engine', 'ejs')
    .set('views', 'docs/views')

    .use(express.static(__dirname + '/static'))

    .use('/', routes)

app.listen(process.env.port, function() {
    console.log(`Application started on port: ${process.env.port}`);
});