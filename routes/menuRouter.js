const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/menuImgs/'})
const middleware = require("../middleware")


//Imports
const menuController = require("../controllers/menu/menuControllers");
const bookingController = require("../controllers/menu/bookingController");

router.post("/menus/add",upload.single('img'),menuController.addMenu)
router.post("/menus/bookings/add", bookingController.newBooking)

router.get("/menus/", menuController.searchMenu)
router.get("/menus/popular", menuController.orderByPopularity)
router.get("/menus/bookings", bookingController.getBookings)
router.get("/menus/bookings/motive:id", bookingController.getMotive)

router.put("/menus/bookings/app/:id", bookingController.approved)
router.put("/menus/bookings/ref/:id", bookingController.refuse)
router.put("/menus/bookings/opinion/:id",middleware.checkToken, bookingController.giveOpinion)

router.delete("/menus/bookings/:id", bookingController.removeBooking)
router.delete("/menus/del/:id", menuController.removeMenu)

module.exports = router