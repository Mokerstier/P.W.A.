function routes(){
    const serve = require('../controllers/routing/serve')
    const render = require('../controllers/render/render')
    const express = require('express');
    const router = express.Router();

    const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({ extended: true });

    // router
    //     .get('/' , serve.getHome)
    //     .get('/home' , serve.getHome)
    //     .get('/movie', serve.getData)
    //     .get('/character', serve.getData)
    //     .get('/character/:id', serve.getDetail)
    //     .get('/movie/:id', serve.getDetail)

    // return router
    router
        .get('/', render.renderHome)
        .get('/heroStats', render.renderHeroes)
    return router
}

exports.routes = routes()
