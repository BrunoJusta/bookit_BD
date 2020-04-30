//Express
const Router = require("express").Router;
var router = Router();

//Import DB
const areasController = require("../controllers/areas/areasControllers");

router.post("/areas/add", areasController.addArea)

router.delete("/areas/", areasController.removeArea)

module.exports = router