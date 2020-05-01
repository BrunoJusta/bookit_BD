const addonsFunctions = require("./addonsFunctions")

//Add Ingredient
function addIngredient(req, result) {
    let name = req.body.name;
    let type = req.body.type;
    addonsFunctions.addIngredient(name, type, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
};

//Remove Ingredient
function removeIngredient(req, result) {
    let id = req.params.id
    addonsFunctions.removeIngredient(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
};

function addDecor(req, result) {
    let name = req.body.name
    addonsFunctions.addDecor(name, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

module.exports = {
    addIngredient: addIngredient,
    removeIngredient: removeIngredient,
    addDecor: addDecor
}