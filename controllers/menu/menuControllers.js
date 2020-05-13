const menuFunctions = require("./menuFunctions")

//ADAPTAR
function addMenu(req, result) {
    let name = req.body.name;
    let menuType = req.body.menuType;
    let newType = req.body.newType
    let img = req.file
    let ing = req.body.ing

    if(menuType === "" || menuType === undefined){
        menuFunctions.addMenuPlusType(name, newType, img.path, ing, (error, success) => {
            if (error) {
                throw error;
                return;
            }
            result.json(success)
    
        })
    }
    else{
        menuFunctions.addMenu(name, menuType, img.path, ing, (error, success) => {
            if (error) {
                throw error;
                return;
            }
            result.json(success)
    
        })

    }


}

function removeMenu(req, result) {
    let id = req.params.id

    menuFunctions.removeMenu(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
};

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
    orderByPopularity: orderByPopularity,
    searchMenu:searchMenu,
    removeMenu: removeMenu,
}