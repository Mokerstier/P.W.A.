const fetch = require('node-fetch')

require("dotenv").config()

async function getHeroes(req, res) {
    console.log(`trying to fetch from: ${process.env.dotaUrl}${req}`)
    try{
        
        const response = await fetch(`${process.env.dotaUrl}${req}`)
        const heroData = await response.json()
        // localStorage.setItem('Heroes', JSON.stringify(heroData))
        return heroData
    }
    catch {
        console.log('Error '+ res.status)
    }
}
async function getStats(req, res) {
    console.log(`trying to fetch from: ${process.env.dotaUrl}${req}`)
    try{
        
        const response = await fetch(`${process.env.dotaUrl}${req}`)
        const data = await response.json()
        // localStorage.setItem('Heroes', JSON.stringify(heroData))
        return data
    }
    catch {
        console.log('Error '+ res.status)
    }
}

module.exports = { getHeroes, getStats }