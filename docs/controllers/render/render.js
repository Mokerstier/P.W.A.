const dotApi = require('../api/dotApi')

function renderHome(req, res) {
    res.render('pages/home.ejs', {
        
        title: 'Home'
    })
}
async function renderHeroes(req, res){
    const heroesData = await dotApi.getHeroes(req.path)
    console.log(heroesData)
    res.render('pages/heroes.ejs', {
        data: heroesData,
        title: 'Home'
    })
}

module.exports = { renderHome, renderHeroes }