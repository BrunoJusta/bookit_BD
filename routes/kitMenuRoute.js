const Router = require("express").Router;
var router = Router();

//Import DB
const kitMenuController = require("../controllers/kit_menu/kitControllers");

router.post("/kitsmenu/add", kitMenuController.addKit)

router.post("/kitsmenu/type", kitMenuController.addKitMenuType)

router.get("/kitsmenu/popular", kitMenuController.orderByPopularity)

module.exports = router