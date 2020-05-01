//Express
const Router = require("express").Router;
var router = Router();

//Import DB
const userController = require("../controllers/user/userController");
const middleware = require("../middleware.js");

let validate = new userController.LoginValidation();


router.post("/users/register", userController.insertUser)

router.delete("/users/:id", userController.deleteUser)

router.post('/login', validate.login)

router.get('/', middleware.checkToken, validate.index);

router.put("/users/p/:id", userController.changePassword)

router.put("/users/num/:id", userController.changeNumber)

module.exports = router;