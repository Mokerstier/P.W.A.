function routes(){
    const serve = require('../controllers/routing/serve')

    const express = require('express');
    const router = express.Router();

    const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({ extended: true });

    router
        .get('/' , serve.getHome)
        .get('/home' , serve.getHome)
        .get('/movie', serve.getData)
        .get('/character', serve.getData)
        .get('/character/:id', serve.getDetail)
        .get('/movie/:id', serve.getDetail)

    return router
}

exports.routes = routes()
