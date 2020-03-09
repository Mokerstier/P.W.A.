function routes(){
    const serve = require('../controllers/routing/serve')

    const express = require('express');
    const router = express.Router();

    const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({ extended: true });

    router
        .get('/', serve.getHome)
        .get('/movie', serve.getMovie)
        .get('/character', serve.getChars)
        .get('/detail/:id', serve.getDetail)

    return router
}

exports.routes = routes()
