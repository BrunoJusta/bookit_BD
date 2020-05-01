//Express
const Router = require("express").Router;
var router = Router();

//Import DB
const areasController = require("../controllers/areas/areasControllers");

router.post("/areas/add", areasController.addArea);
router.delete("/areas/:id", areasController.removeArea);
router.put("/areas/:id", areasController.updateArea)
router.get("/areas/:id", areasController.getDetails)
router.get("/areas/", areasController.searchArea)

module.exports = router