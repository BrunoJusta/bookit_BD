//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/areas/'})
const middleware = require("../middleware.js");


//Import
const areasController = require("../controllers/area/areasControllers");
const areasBookingController = require("../controllers/area/areasBookingController");

router.post("/areas/add",middleware.checkToken, upload.single('img'), areasController.addArea);
router.post("/areas/bookings/add",middleware.checkToken, areasBookingController.newAreaBooking)

router.get("/areas/", areasController.getAreas)
// router.get("/areas/", areasController.searchArea)
router.get("/areas/bookings/",middleware.checkToken, areasBookingController.areasBooking)

router.put("/areas/edit/:id",middleware.checkToken, areasController.updateArea)
router.put("/areas/bookings/app/:id",middleware.checkToken, areasBookingController.approved)
router.put("/areas/bookings/ref/:id",middleware.checkToken, areasBookingController.refuse)
router.put("/areas/bookings/opinion/:id",middleware.checkToken, areasBookingController.giveOpinion)

router.delete("/areas/bookings/:id",middleware.checkToken, areasBookingController.removeAreaBooking)
router.delete("/areas/del/:id",middleware.checkToken, areasController.removeArea);

module.exports = router