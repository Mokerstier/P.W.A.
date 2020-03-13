const dotApi = require('../api/dotApi')
const fs = require('fs-extra')
// const getHero = require('../getStored/getHero')
const recentMatches = '/recentMatches'

function renderHome(req, res) {
    res.render('pages/home.ejs', {
        title: 'Home'
    })
}
async function renderHeroes(req, res) {
    //const heroesData = await dotApi.getHeroes(req.path)
    // heroes = getHero.getHero()
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
async function renderStats(req, res) {
    const myStats = await dotApi.getData(req.path)
    const recentMatchesData = await dotApi.getData(req.path + recentMatches)
    const heroNames = []
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        const dataHeroes = JSON.parse(data);
        const heroes = dataHeroes.heroes 
        
        recentMatchesData.map(match => {
            const matchHero = heroes.filter(hero => match.hero_id === hero.id) 
            matchHero.map(hero =>{
                heroNames.push(hero.localized_name)
            })
        })
        res.render('pages/myStats.ejs', {
            matches: recentMatchesData,
            // matchHero: matchHero,
            heroName: heroNames,
            data: myStats,
            title: 'My stats'
        });
        
    })
    
}
// function renderDetail(req, res){
//     const heroesData = 
// }

module.exports = { renderHome, renderHeroes, renderStats }