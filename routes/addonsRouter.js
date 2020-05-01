const Router = require("express").Router;
var router = Router();

//Import DB
const addonsController = require("../controllers/addons/addonsControllers");

router.post("/ingredients/", addonsController.addIngredient)
router.delete("/ingredients/:id",addonsController.removeIngredient)
router.post("/decors/", addonsController.addDecor)
router.delete("/decors/:id", addonsController.removeDecor)

module.exports = router