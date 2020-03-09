const fetch = require('node-fetch')
require("dotenv").config()

const url = 'https://the-one-api.herokuapp.com/v1'
const config = {
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${process.env.APIKEY}` 
    }
}
function getHome(req, res){
    const path = req.path
    fetch(`${url}${path}`, config )
    .then(res => res.json())
    .then(json => 
        res.render('pages/home.ejs', {
        data: json,
        title: 'Home'
        })
    );
}
function getMovie(req, res) {
    const path = req.path
    fetch(`${url}${path}`, config )
    .then(res => res.json())
    .then(json => 
        res.render('pages/movie.ejs', {
        data: json,
        title: 'Home'
        })
    );
}

function getDetail(req, res) {
    const {id} = req.params
    const path = req.path
    console.log(path)
    fetch(`${url}${path}/${id}`, config )
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => 
        res.render('pages/detail.ejs', {
        data: json,
        title: 'Detail'
        })
    );
}

function getChars(req, res){
    const path = req.path
    console.log(`${url}${path}`)
    fetch(`${url}${path}`, config )
    .then(response => response.json())
    //.then(json => console.log(json.docs))
    .then(json => 
        res.render('pages/chars.ejs', {
        data: json.docs,
        title: 'List all characters'
        })
    );
}

module.exports = {getHome, getMovie, getDetail, getChars}