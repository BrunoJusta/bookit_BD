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
};

function removeDecor(req, result) {
    let id = req.params.id
    addonsFunctions.removeDecor(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
};

function addOutfit(req, result) {
    let img = req.file;
    let name = req.body.name;

    addonsFunctions.addOutfit(img.path, name, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success);
    });
}

function removeOutfit(req, result) {
    let id = req.params.id
    addonsFunctions.removeOutfit(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
};

function addExtra(req, result) {
    let name = req.body.name
    addonsFunctions.addExtra(name, (error, success) => {
        if (error) {
            throw error;
            return
        }
        result.json(success)
    });
};

function removeExtra(req, result) {
    let id = req.params.id;
    addonsFunctions.removeExtra(id,(error,success)=>{
        if(error){
            throw error;
            return;
        };
        result.json(success)
    })
}

module.exports = {
    addIngredient: addIngredient,
    removeIngredient: removeIngredient,
    addDecor: addDecor,
    removeDecor: removeDecor,
    addOutfit: addOutfit,
    removeOutfit: removeOutfit,
    addExtra: addExtra,
    removeExtra: removeExtra,
}