const dotApi = require('../api/dotApi')
const fs = require('fs-extra')
const getter = require('../getStored/getter')
const recentMatches = '/recentMatches'

function renderHome(req, res) {
    res.render('pages/home.ejs', {
        title: 'Home'
    })
}
async function renderHeroes(req, res) { 
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        let heroes = JSON.parse(data);
    res.render('pages/heroes.ejs', {
        data: heroes.heroes,
        title: 'Home'
    })
    });

}
function renderDetail(req, res) {
    // const heroes = getter.getHeroes()
    // console.log(heroes)
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        const dataHeroes = JSON.parse(data)
        const heroes = dataHeroes.heroes
        const id = req.params.id

        const thisHero = heroes.filter(hero => hero.id == id)
        const hero = thisHero[0]
        res.render('pages/detail.ejs',{
            hero: hero,
            title: `Detail ${hero.localized_name}`
           
        })
    })

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
            matchHero.map(hero => {
                heroNames.push(hero.localized_name)
            })
        })
        res.render('pages/myStats.ejs', {
            matches: recentMatchesData,
            heroName: heroNames,
            data: myStats,
            title: 'My stats'
        });

    })

}


module.exports = { renderDetail, renderHome, renderHeroes, renderStats }