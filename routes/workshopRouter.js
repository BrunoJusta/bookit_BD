//Express
const Router = require("express").Router;
var router = Router();

//Import DB
const workshopController = require("../controllers/workshops/workshopsController");

router.post("/workshops/add", workshopController.addWorkshop)

router.delete("/workshops/del/:id", workshopController.removeWorkshop)

router.put("/workshops/edit/:id", workshopController.updateWorkshop)

module.exports=router;