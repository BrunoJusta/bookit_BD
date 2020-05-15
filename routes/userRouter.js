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
router.post('/logout',userController.logout)


router.get('/', validate.index);
router.get("/users/",middleware.checkToken, userController.getUsers)
router.get("/users/menuBookings/table/:id",middleware.checkToken, userController.menuBookingsById)
router.get("/users/areaBookings/table/:id",middleware.checkToken, userController.areaBookingsById)
router.get("/users/workshopBookings/table/:id",middleware.checkToken, userController.workshopBookingsById)
router.get("/users/notifications/table/:id",middleware.checkToken, userController.notificationsById)
router.get("/users/archivations/table/:id",middleware.checkToken, userController.archivationsById)

router.put("/users/p/:id",middleware.checkToken, userController.changePassword)
router.put("/users/num/:id",middleware.checkToken, userController.changeNumber)
router.put("/users/type/:id",middleware.checkToken, userController.changeType)
router.put("/users/img/:id",middleware.checkToken,upload.single('newImg'), userController.changeAvatar)
router.put("/users/notifications/archive/:id",middleware.checkToken, userController.archive)

router.delete("/users/:id",middleware.checkToken, userController.deleteUser)
router.delete("/users/notifications/del/:id",middleware.checkToken, userController.deleteNotification)
router.delete("/users/archivations/del/:id",middleware.checkToken, userController.deleteNotification)

module.exports = router;