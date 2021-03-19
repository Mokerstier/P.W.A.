const express = require('express')

const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const compression = require('compression')
require('dotenv').config()

const { routes } = require("./routes/routes");


const port = 8000
const app = express()


app
    .use(compression())
    .enable('etag')
    .set('etag', 'strong')
    .set('view engine', 'ejs')
    .set('views', 'docs/views')

    .use(express.static(__dirname + '/static'))

    .use((req, res, next) => {
        res.header('Cache-Control', 'max-age=2592000000');
        next()
    })
    
    .use('/', routes)
    .use(function (req, res) {
        res.status(404).send("Sorry can't find that!")
      })

app.listen(process.env.PORT || port, () => {
    console.log(`Application started on port: ${port}`);
    console.log(`open the page -> http://localhost:${port}`)
});