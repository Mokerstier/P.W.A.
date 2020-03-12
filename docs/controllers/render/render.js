const dotApi = require('../api/dotApi')
const fs = require('fs-extra')

function renderHome(req, res) {
    res.render('pages/home.ejs', {
        
        title: 'Home'
    })
}
async function renderHeroes(req, res){
    //const heroesData = await dotApi.getHeroes(req.path)
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        let heroes = JSON.parse(data);
        res.render('pages/heroes.ejs', {
            data: heroes.heroes,
            title: 'Home'
        });
    });
    
}
async function renderStats(req, res){
    const myStats = await dotApi.getStats(req.path)
    console.log(myStats.profile)
    res.render('pages/myStats.ejs', {
        data: myStats,
        title: 'Home'
    });
}
// function renderDetail(req, res){
//     const heroesData = 
// }

module.exports = { renderHome, renderHeroes, renderStats }