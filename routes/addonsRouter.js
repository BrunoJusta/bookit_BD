const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/outfits/'})


//Import DB
const addonsController = require("../controllers/addons/addonsControllers");

router.post("/ingredients/", addonsController.addIngredient)
router.post("/decors/", addonsController.addDecor)
router.post("/outfits/", upload.single('img'),addonsController.addOutfit)
router.post("/extras/", addonsController.addExtra)

router.get("/ingredients/table", addonsController.getIngredients)
router.get("/decors/table", addonsController.getDecors)
router.get("/outfits/table", addonsController.getOutfits)
router.get("/extras/table", addonsController.getExtras)

router.delete("/extras/:id", addonsController.removeExtra)
router.delete("/ingredients/:id",addonsController.removeIngredient)
router.delete("/decors/:id", addonsController.removeDecor)
router.delete("/outfits/:id", addonsController.removeOutfit)

module.exports = router