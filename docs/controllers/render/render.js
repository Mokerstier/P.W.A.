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
        if (err) throw err;
        let heroes = JSON.parse(data);
        
        res.render('pages/heroes.ejs', {
            data: heroes.heroes,
            title: 'Home'
        })
    });
    
}
// function renderDetail(req, res){
//     const heroesData = 
// }

module.exports = { renderHome, renderHeroes,  }