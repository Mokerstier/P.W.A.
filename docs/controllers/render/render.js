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
async function renderDetail(req, res) {
    // const heroes = getter.getHeroes()
    // console.log(heroes)
    const id = req.params.id
    let heroArray
    
    let stat =''
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        const dataHeroes = JSON.parse(data)
        const heroes = dataHeroes.heroes
        
        heroArray = heroes.filter(hero => hero.id == id)
        heroArray.map(hero => {
            heroArray = hero
            switch (heroArray.primary_attr){
                case 'agi':
                    stat = 'Agility'
                    break
                case 'str':
                    stat = 'Strength'
                    break
                case 'int':
                    stat = 'Intelligence'
                    break
                }
        })
       
        res.render('pages/detail.ejs',{
            hero: heroArray,
            stat: stat,
            title: `Detail ${heroArray.localized_name}`
           
        })
        
        
    })
   
}
async function renderStats(req, res) {
    const myStats = await dotApi.getData(req.path)
    const recentMatchesData = await dotApi.getData(req.path + recentMatches)
    const heroNames = []
    const heroImgArray = []
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        const dataHeroes = JSON.parse(data);
        const heroes = dataHeroes.heroes

        recentMatchesData.map(match => {
            const matchHero = heroes.filter(hero => match.hero_id === hero.id)
            matchHero.map(hero => {
                heroNames.push(hero.localized_name)
                heroImgArray.push(hero.img)
            })
        })
        res.render('pages/myStats.ejs', {
            matches: recentMatchesData,
            heroImgArray: heroImgArray,
            heroName: heroNames,
            data: myStats,
            title: 'My stats'
        });

    })

}
function render404(req, res, next){
    res.render('pages/404.ejs',{
        title: '404',
        randomHero: Math.floor(Math.random() * 130)
    })
}

module.exports = { renderDetail, renderHome, renderHeroes, renderStats, render404 }