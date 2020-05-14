//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/workshops/'})
const middleware = require("../middleware.js");


//Import
const workshopController = require("../controllers/workshops/workshopsController");

router.post("/workshops/add",middleware.checkToken,upload.single('img'),workshopController.addWorkshop)

router.get("/workshops/", workshopController.getWorkshops)

router.put("/workshops/edit/:id",middleware.checkToken, workshopController.updateWorkshop)

router.delete("/workshops/del/:id",middleware.checkToken, workshopController.removeWorkshop)

module.exports=router;