//Express
const Router=require("express").Router;
var router=Router();

//Import DB
const userController = require("../controllers/user/userController");
const middleware = require("../middleware.js");

let validate = new userController.LoginValidation();


router.post("/users/register", userController.insertUser)

router.get("/users/", userController.tableUser);

router.delete("/users/", userController.deleteUser)

router.post('/login', validate.login)

router.get('/', middleware.checkToken, validate.index);


module.exports=router;