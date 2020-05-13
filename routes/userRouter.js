//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/userImgs/'})

//Import
const userController = require("../controllers/user/userController");
const middleware = require("../middleware.js");

let validate = new userController.LoginValidation();

router.post("/users/register",userController.insertUser)
router.post('/login', validate.login)

router.get('/', middleware.checkToken, validate.index);
router.get("/users/table", userController.getUsers)
router.get("/users/menuBookings/table/:id", userController.menuBookingsById)
router.get("/users/areaBookings/table/:id", userController.areaBookingsById)
router.get("/users/workshopBookings/table/:id", userController.workshopBookingsById)
router.get("/users/notifications/table/:id", userController.notificationsById)
router.get("/users/archivations/table/:id", userController.archivationsById)

router.put("/users/p/:id", userController.changePassword)
router.put("/users/num/:id", userController.changeNumber)
router.put("/users/type/:id", userController.changeType)
router.put("/users/img/:id",upload.single('newImg'), userController.changeAvatar)
router.put("/users/notifications/archive/:id", userController.archive)

router.delete("/users/:id", userController.deleteUser)
router.delete("/users/notifications/del/:id", userController.deleteNotification)
router.delete("/users/archivations/del/:id", userController.deleteNotification)

module.exports = router;