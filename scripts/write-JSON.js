const fs = require('fs-extra')
const dotApi = require('../docs/controllers/api/dotApi')
const path = require('path')

require("dotenv").config()

dotApi.getData(`/heroStats`).then(heroesData => {

    let jsonContent = `{"heroes":${JSON.stringify(heroesData, null, 2)}}`
    fs.mkdirp(path.join(__dirname, '..', 'data'))
    fs.writeFile(path.join(__dirname, '..', 'data/data.json'), jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    })
})
