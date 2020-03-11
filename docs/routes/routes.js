function routes(){

    const render = require('../controllers/render/render')
    const express = require('express');
    const router = express.Router();

    const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({ extended: true });
    router
        .get('/', render.renderHome)
        .get('/heroStats', render.renderHeroes)
        // .get('/:id', render.renderDetail)
    return router
}

exports.routes = routes()
