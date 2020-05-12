//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/areas/'})

//Import
const areasController = require("../controllers/area/areasControllers");
const areasBookingController = require("../controllers/area/areasBookingController");

router.post("/areas/add",upload.single('img'),areasController.addArea);

router.delete("/areas/:id", areasController.removeArea);

router.put("/areas/:id", areasController.updateArea)
router.get("/areas/:id", areasController.getDetails)
router.get("/areas/", areasController.searchArea)

router.post("/areas/bookings", areasBookingController.newAreaBooking)

router.put("/areas/bookings/app/:id", areasBookingController.approved)

router.put("/areas/bookings/ref/:id", areasBookingController.refuse)

router.delete("/areas/bookings/:id", areasBookingController.removeAreaBooking)


//GET AREA BOOKINGS TABELAS


module.exports = router