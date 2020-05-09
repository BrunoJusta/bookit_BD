const Router = require("express").Router;
var router = Router();

//Imports
const menuController = require("../controllers/menu/menuControllers");
const bookingController = require("../controllers/menu/bookingController");

router.post("/menus/add", menuController.addMenu)

router.post("/menus/type", menuController.addMenuType)

router.get("/menus/popular", menuController.orderByPopularity)

router.post("/menus/bookings", bookingController.newBooking)

router.put("/menus/bookings/app/:id", bookingController.approved)

router.put("/menus/bookings/ref/:id", bookingController.refuse)

router.delete("/menus/bookings/:id", bookingController.removeBooking)


module.exports = router