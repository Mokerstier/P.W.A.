const fetch = require('node-fetch')


const URL = 'https://api.opendota.com/api'
// async function getHeroes(req, res) {
//     console.log(`trying to fetch from: ${process.env.dotaUrl}${req}`)
//     try{
        
//         const response = await fetch(`${process.env.dotaUrl}${req}`)
//         const heroData = await response.json()

//         return heroData
//     }
//     catch {
//         console.log('Error '+ res.status)
//     }
// }
async function getData(req, res) {
    console.log(`trying to fetch from: ${URL}${req}`)
    try{
        
        const response = await fetch(`${URL}${req}`)
        const data = await response.json()

        return data
    }
    catch {
        console.log('Error '+ res.status)
    }
}

module.exports = {  getData }