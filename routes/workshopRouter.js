//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/workshops/'})


//Import
const workshopController = require("../controllers/workshops/workshopsController");

router.post("/workshops/add",upload.single('img'),workshopController.addWorkshop)

router.delete("/workshops/del/:id", workshopController.removeWorkshop)

router.put("/workshops/edit/:id", workshopController.updateWorkshop)

router.get("/workshops/", workshopController.search)

//GET WORKSHOPS TABLE

module.exports=router;