const Router = require("express").Router;
var router = Router();

//Import DB
const addonsController = require("../controllers/addons/addonsControllers");

router.post("/ingredient/", addonsController.addIngredient)
router.delete("/ingredient/",addonsController.removeIngredient)

module.exports = router