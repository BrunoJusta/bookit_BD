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

function getMenus(req, result) {
    menuFunctions.getMenus((error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}
function getMenuType(req,result){
    menuFunctions.getMenuType((error, success) =>{
        if(error){
            throw error;
            return;
        }
        result.json(success);
    })
    
}

function getMenu(req, result){
    let id = req.params.id
    menuFunctions.getMenu(id,(error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}


module.exports = {
    addMenu: addMenu,
    getMenus: getMenus,
    removeMenu: removeMenu,
    getMenuType: getMenuType,
    getMenu: getMenu,
}