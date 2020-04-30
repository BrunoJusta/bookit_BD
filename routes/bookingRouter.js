//Express
const Router=require("express").Router;
var router=Router();

//Import DB
const bookingController = require("../controllers/booking/bookingController");



router.post("/booking", bookingController.Newbooking)



module.exports=router;