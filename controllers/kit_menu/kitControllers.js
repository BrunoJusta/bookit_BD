const kitFunctions = require("./kitFunctions")

//Add Area
function addKitMenuType(req, result){
    let description = req.body.description;
    kitFunctions.addKitMenuType(description,(error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}
function addKit(req, result) {
    let name = req.body.name;
    let menuType = req.body.menuType;
    let img = ""

    kitFunctions.addKitMenu(name, menuType, img,(error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)

    })

}

/* function removeArea(req, result){
    let id  = req.body.id

    areasFunctions.removeArea(id, (error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
} */

module.exports = {
    addKit:addKit,
    addKitMenuType:addKitMenuType,
}