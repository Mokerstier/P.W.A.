const fs = require('fs-extra')

function getHeroes(){
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        let heroes = JSON.parse(data);
        
        return heroes.heroes
    })
}
module.exports = { getHeroes }