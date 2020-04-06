const express = require("express");
const bodyParser = require("body-parser");
const validator = require('express-validator')
const cors = require("cors");
const config = require("./config.json");
const userRouter = require("./routes/userRouter.js");
const jwt = require('jsonwebtoken');


const app = express();


app.use(validator());
app.use(function(req, res, next){
    for (var item in req.body) {
        req.sanitize(item).escape();
    }
    next();
})
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());


app.use(userRouter);


app.listen(config.port, () => console.log(config.serverStartMessage, config.host, config.port));







