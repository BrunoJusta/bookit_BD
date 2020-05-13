//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/workshops/'})


//Import
const workshopController = require("../controllers/workshops/workshopsController");

router.post("/workshops/add",upload.single('img'),workshopController.addWorkshop)

router.get("/workshops/", workshopController.search)
router.get("/workshops/table",workshopController.getWorkshops)

router.put("/workshops/edit/:id", workshopController.updateWorkshop)

router.delete("/workshops/del/:id", workshopController.removeWorkshop)

module.exports=router;