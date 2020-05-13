//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({
    dest: 'assets/areas/'
})

//Import
const areasController = require("../controllers/area/areasControllers");
const areasBookingController = require("../controllers/area/areasBookingController");

router.post("/areas/add", upload.single('img'), areasController.addArea);
router.post("/areas/bookings/", areasBookingController.newAreaBooking)

router.get("/areas/details/:id", areasController.getDetails)
router.get("/areas/", areasController.searchArea)
router.get("/areas/table/", areasBookingController.tableAreaBooking)

router.put("/areas/edit/:id", areasController.updateArea)
router.put("/areas/bookings/app/:id", areasBookingController.approved)
router.put("/areas/bookings/ref/:id", areasBookingController.refuse)
router.put("/areas/bookings/opinion/:id", areasBookingController.giveOpinion)

router.delete("/areas/bookings/:id", areasBookingController.removeAreaBooking)
router.delete("/areas/del/:id", areasController.removeArea);

module.exports = router