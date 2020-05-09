//Express
const Router = require("express").Router;
var router = Router();

//Import
const areasController = require("../controllers/area/areasControllers");
const areasBookingController = require("../controllers/area/areasBookingController");

router.post("/areas/add", areasController.addArea);

router.delete("/areas/:id", areasController.removeArea);

router.put("/areas/:id", areasController.updateArea)

router.post("/areas/bookings", areasBookingController.newAreaBooking)

router.put("/areas/bookings/app/:id", areasBookingController.approved)

router.put("/areas/bookings/ref/:id", areasBookingController.refuse)

router.delete("/areas/bookings/:id", areasBookingController.removeAreaBooking)

module.exports = router