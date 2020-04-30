const addonsFunctions = require("./addonsFunctions")

//Add Ingredient
function addIngredient(req, result) {
    let name = req.body.name;
    let type = req.body.type;
    addonsFunctions.addIngredient(name, type, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

//Remove Ingredient
function removeIngredient(req,result){
    let id = req.body.id
    addonsFunctions.removeIngredient(id,(error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    addIngredient: addIngredient,
    removeIngredient: removeIngredient
}