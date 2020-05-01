//Express
const Router = require("express").Router;
var router = Router();

//Import DB
const workshopController = require("../controllers/workshops/workshopsController");

router.post("/workshops/add", workshopController.addWorkshop)

router.delete("/workshops/:id", workshopController.removeWorkshop)

module.exports=router;