//Express
const Router=require("express").Router;
var router=Router();

//Import DB
const database = require("../database/database.js");


router.post("/users/", database.insertUser)

router.get("/users/", database.tableUser);

router.delete("/users/", database.deleteUser)


module.exports=router;