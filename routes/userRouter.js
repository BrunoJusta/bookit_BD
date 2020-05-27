//Express
const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/userImgs/'})

//Import
const userController = require("../controllers/user/userController");
const middleware = require("../middleware.js");

let validate = new userController.LoginValidation();

router.post("/users",userController.insertUser)
router.post('/login', validate.login)
router.post('/logout',userController.logout)


router.get('/', validate.index);
router.get("/users/",middleware.checkToken, userController.getUsers)
router.get("/users/menuBookings/:id",middleware.checkToken, userController.menuBookingsById)
router.get("/users/areaBookings/:id",middleware.checkToken, userController.areaBookingsById)
router.get("/users/workshopBookings/:id",middleware.checkToken, userController.workshopBookingsById)
router.get("/users/notifications/:id",middleware.checkToken, userController.notificationsById)
router.get("/users/archivations/:id",middleware.checkToken, userController.archivationsById)

router.put("/users/p/:id",middleware.checkToken, userController.changePassword)
router.put("/users/n/:id",middleware.checkToken, userController.changeNumber)
router.put("/users/t/:id",middleware.checkToken, userController.changeType)
router.put("/users/i/:id",middleware.checkToken,upload.single('newImg'), userController.changeAvatar)
router.put("/users/notifications/:id",middleware.checkToken, userController.archive)

router.delete("/users/:id",middleware.checkToken, userController.deleteUser)
router.delete("/users/notifications/:id",middleware.checkToken, userController.deleteNotification)
router.delete("/users/archivations/:id",middleware.checkToken, userController.deleteNotification)

module.exports = router;