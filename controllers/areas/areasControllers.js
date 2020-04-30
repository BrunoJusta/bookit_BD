const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);
const areasFunctions = require("./areasFunctions")

//Add Area
function addArea(req, result) {
    let name = req.body.name;
    let description = req.body.description;
    let img = "";

    areasFunctions.addArea(name, description, img,(error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)

    })

}

function removeArea(req, result){
    let id  = req.body.id

    areasFunctions.removeArea(id, (error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    addArea: addArea,
    removeArea:removeArea,
}