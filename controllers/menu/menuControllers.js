const menuFunctions = require("./menuFunctions")

//ADAPTAR
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
    let img = req.file

    menuFunctions.addMenu(name, menuType, img.path, (error, success) => {
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

function searchMenu(req, result) {
    let search = req.body.search
    menuFunctions.searchMenu(search, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
}

//FUNÇÃO SEARCH BY TYPE

//FUNÇÃO UPDATE MENU

module.exports = {
    addMenu: addMenu,
    addMenuType: addMenuType,
    orderByPopularity: orderByPopularity,
    searchMenu:searchMenu
}