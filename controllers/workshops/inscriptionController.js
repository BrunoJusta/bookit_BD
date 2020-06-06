const inscriptionFunctions = require("./inscriptionFunctions")

//Eliminar Workshop
function addInscription(req, result) {
    let idUser = req.body.idUser;
    let idWorkshop = req.body.idWorkshop;
    inscriptionFunctions.addInscription(idUser, idWorkshop, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}
function getInscription(req, result){
    inscriptionFunctions.getInscription((error, success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    addInscription: addInscription,
    getInscription: getInscription
}