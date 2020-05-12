const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/outfits/'})


//Import DB
const addonsController = require("../controllers/addons/addonsControllers");

router.post("/ingredients/", addonsController.addIngredient)
router.delete("/ingredients/:id",addonsController.removeIngredient)
router.post("/decors/", addonsController.addDecor)
router.delete("/decors/:id", addonsController.removeDecor)
router.post("/outfits/", upload.single('img'),addonsController.addOutfit)
router.delete("/outfits/:id", addonsController.removeOutfit)
router.post("/extras/", addonsController.addExtra)
router.delete("/extras/:id", addonsController.removeExtra)

//GET PARA AS TABELAS


module.exports = router