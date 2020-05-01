//Express
const Router=require("express").Router;
var router=Router();

//Import DB
const bookingController = require("../controllers/booking/bookingController");



router.post("/bookings", bookingController.newBooking)

router.put("/bookings/app/:id", bookingController.approved)
router.put("/bookings/ref/:id", bookingController.refuse)

router.delete("/bookings/:id", bookingController.removeBooking)




module.exports=router;