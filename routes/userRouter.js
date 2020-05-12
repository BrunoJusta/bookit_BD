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

router.delete("/users/:id", userController.deleteUser)

router.get('/', middleware.checkToken, validate.index);

router.put("/users/p/:id", userController.changePassword)

router.put("/users/num/:id", userController.changeNumber)

router.put("/users/type/:id", userController.changeType)

router.put("/users/img/:id",upload.single('newImg'), userController.changeAvatar)


//GET USERS TABLE
//GET USER HISTORY BOOKINGS
//GET USER HISTORY AREAS BOOKINGS
//GET USER WORKSHOPS
//GET USER NOTIFICATIONS
//GET USER ARQUIVATIONS
//DELETE ARQUIVATION
//UPDATE NOTIFICATION TO ARQUIVATION




module.exports = router;