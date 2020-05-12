const areasFunctions = require("./areasFunctions")

//Add Area
function addArea(req, result) {
    let name = req.body.name;
    let description = req.body.description;
    let img = req.file;

    areasFunctions.addArea(name, description, img.path, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)

    })

}

function removeArea(req, result) {
    let id = req.params.id

    areasFunctions.removeArea(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
};

function updateArea(req, result) {
    let id = req.params.id
    let name = req.body.name
    let description = req.body.description

    areasFunctions.updateArea(name, description, id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success);
    });
};

function getDetails(req, result) {
    let id = req.params.id
    areasFunctions.getDetails(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function searchArea(req, result) {
    let search = req.body.search
    areasFunctions.searchArea(search, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    });
}
module.exports = {
    addArea: addArea,
    removeArea: removeArea,
    updateArea: updateArea,
    getDetails: getDetails,
    searchArea: searchArea,
    
}

