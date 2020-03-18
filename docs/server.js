const express = require('express')
const session = require("express-session")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const cookieParser = require("cookie-parser")
const passport = require("passport")
const flash = require("connect-flash")

const { routes } = require("./routes/routes");

const user = require("./controllers/users");

const port = 8000
const app = express()

mongoose.connect(uri, options);
mongoose.connection.on("open", function(err, doc) {
	console.log(`connection established with ${process.env.DB_NAME}`);
	if (err) throw err;
});

app
    .set('view engine', 'ejs')
    .set('views', 'docs/views')

    .use(express.static(__dirname + '/static'))

    .use('/', routes)

app.listen(process.env.PORT || port, () => {
    console.log(`Application started on port: ${port}`);
    console.log(`open the page -> http://localhost:${port}`)
});