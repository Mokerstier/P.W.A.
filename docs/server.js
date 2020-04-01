const express = require('express')
const session = require("express-session")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const cookieParser = require("cookie-parser")
const passport = require("passport")
const compression = require('compression')
require('dotenv').config()

const { routes } = require("./routes/routes");

//const {user} = require("./controllers/users");

const port = 8000
const app = express()

// mongoose.connect(uri, options);
// mongoose.connection.on("open", function(err, doc) {
// 	console.log(`connection established with ${process.env.DB_NAME}`);
// 	if (err) throw err;
// });

app
    .enable('etag')
    .set('etag', 'strong')
    .set('view engine', 'ejs')
    .set('views', 'docs/views')
    
    .use(compression())
    .use(express.static(__dirname + '/static'))

    .use((req, res, next) => {
        res.header('Cache-Control', 'max-age=2592000000');
        next()
    })
    
    .use('/', routes)
    .use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
      })

app.listen(process.env.PORT || port, () => {
    console.log(`Application started on port: ${port}`);
    console.log(`open the page -> http://localhost:${port}`)
});