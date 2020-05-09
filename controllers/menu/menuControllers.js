const menuFunctions = require("./menuFunctions")

//Add Area
function addMenuType(req, result) {
    let description = req.body.description;
    menuFunctions.addMenuType(description, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

function addMenu(req, result) {
    let name = req.body.name;
    let menuType = req.body.menuType;
    let img = ""

    menuFunctions.addMenu(name, menuType, img, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)

    })
}

function orderByPopularity(req, result) {
    menuFunctions.orderByPopularity((error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    addMenu: addMenu,
    addMenuType: addMenuType,
    orderByPopularity: orderByPopularity
}