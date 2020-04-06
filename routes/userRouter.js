//Express
const Router=require("express").Router;
var router=Router();

//Import DB
const database = require("../database/database.js");
const middleware = require("../middleware.js");

let validate = new database.LoginValidation();


router.post("/users/register", database.insertUser)

router.get("/users/", database.tableUser);

router.delete("/users/", database.deleteUser)

router.post('/login', validate.login)

router.get('/', middleware.checkToken, validate.index);


module.exports=router;