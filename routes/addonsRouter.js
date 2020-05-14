const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/outfits/'})
const middleware = require("../middleware.js");



//Import DB
const addonsController = require("../controllers/addons/addonsControllers");

router.post("/ingredients/add",middleware.checkToken, addonsController.addIngredient)
router.post("/decors/add",middleware.checkToken, addonsController.addDecor)
router.post("/outfits/add",middleware.checkToken, upload.single('img'),addonsController.addOutfit)
router.post("/extras/add",middleware.checkToken, addonsController.addExtra)

router.get("/ingredients/",middleware.checkToken, addonsController.getIngredients)
router.get("/decors/",middleware.checkToken, addonsController.getDecors)
router.get("/outfits/",middleware.checkToken, addonsController.getOutfits)
router.get("/extras/",middleware.checkToken, addonsController.getExtras)

router.delete("/extras/del/:id",middleware.checkToken, addonsController.removeExtra)
router.delete("/ingredients/del/:id",middleware.checkToken, addonsController.removeIngredient)
router.delete("/decors/del/:id",middleware.checkToken, addonsController.removeDecor)
router.delete("/outfits/del/:id",middleware.checkToken, addonsController.removeOutfit)

module.exports = router