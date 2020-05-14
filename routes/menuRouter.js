const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/menuImgs/'})
const middleware = require("../middleware")


//Imports
const menuController = require("../controllers/menu/menuControllers");
const bookingController = require("../controllers/menu/bookingController");

router.post("/menus/add",middleware.checkToken,upload.single('img'),menuController.addMenu)
router.post("/menus/bookings/add",middleware.checkToken, bookingController.newBooking)
router.get("/menus/", menuController.getMenus)
router.get("/menus/bookings",middleware.checkToken, bookingController.getBookings)
router.get("/menus/bookings/decor",middleware.checkToken, bookingController.getBookingsDecor)
router.get("/menus/bookings/extra",middleware.checkToken, bookingController.getBookingsExtra)
router.get("/menus/bookings/addOn",middleware.checkToken, bookingController.getBookingsAddOn)
router.put("/menus/bookings/app/:id",middleware.checkToken, bookingController.approved)
router.put("/menus/bookings/ref/:id",middleware.checkToken, bookingController.refuse)
router.put("/menus/bookings/opinion/:id",middleware.checkToken, bookingController.giveOpinion)
router.delete("/menus/bookings/:id",middleware.checkToken, bookingController.removeBooking)
router.delete("/menus/del/:id",middleware.checkToken, menuController.removeMenu)

module.exports = router