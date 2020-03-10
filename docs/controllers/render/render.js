const dotApi = require('../api/dotApi')

function renderHome(req, res) {
    res.render('pages/home.ejs', {
        
        title: 'Home'
    })
}
async function renderHeroes(req, res){
    const data = await dotApi.getHeroes(req.path)
    console.log(data)
    res.render('pages/heroes.ejs', {
        data: data,
        title: 'Home'
    })
}

module.exports = { renderHome, renderHeroes }