const fs = require('fs-extra')

async function getHero(){
    fs.readFile('data/data.json', (err, data) => {
        if (err)
            throw err;
        let heroes = JSON.parse(data);
        return heroes
    })
}
module.exports = {getHero}