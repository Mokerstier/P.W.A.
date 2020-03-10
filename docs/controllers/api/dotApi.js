const fetch = require('node-fetch')

require("dotenv").config()

async function getHeroes(req, res) {
    const response = await fetch(`${process.env.dotaUrl}${req}`)
    const json = await response.json()
    return json
}

module.exports = { getHeroes }