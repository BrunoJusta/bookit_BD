//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/workshops/'})
const middleware = require("../middleware.js");


//Import
const workshopController = require("../controllers/workshops/workshopsController");
const inscriptionController = require("../controllers/workshops/inscriptionController");


router.post("/workshops/",middleware.checkToken,upload.single('img'),workshopController.addWorkshop)

router.post("/workshops/inscription",middleware.checkToken,inscriptionController.addInscription)

router.get("/workshops/", workshopController.getWorkshops)

router.put("/workshops/:id",middleware.checkToken, workshopController.updateWorkshop)

router.delete("/workshops/:id",middleware.checkToken, workshopController.removeWorkshop)

module.exports=router;