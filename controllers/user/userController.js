const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const bcrypt = require('bcrypt');
var connection = mysql.createConnection(dbConfig);
const userFunctions = require("./userFunctions")


//Register User
function insertUser(req,result) {
    //Variaveis
    let name = req.body.name
    let lastName = req.body.lastName
    let number = req.body.number
    let img = ""
    let email = req.body.email
    let birthDate = req.body.birthDate
    let school = 0
    let userType_id = 1

    //verify Password = 123AvesChines
    if (req.body.password === req.body.password2) {
        //Encrypting Password
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            userFunctions.register(name,lastName, email, hash, number,img, userType_id, school, birthDate, (error, success) =>{
                if (error){
                    throw error;
                    return;
                }
                result.json(success)
            })
        })
    } else {
        console.log("Passwords nao coincidem!")
    }
}

//Login User
class LoginValidation {
    //FLogin
    login(req, result) {
        //Variaveis
        let email = req.body.email;
        let password = req.body.password;
        userFunctions.login(email, password, (error, success) =>{
            if (error){
                throw error;
                return;
            }
            result.json(success)
        })
    }
    index(req, res) {
        res.json({
            success: true,
            message: 'Index page',
        });
    }
}


module.exports = {
    insertUser: insertUser,
    tableUser: tableUser,
    deleteUser: deleteUser,
    LoginValidation: LoginValidation,
}





//Table User
function tableUser(req, res) {
    connection.connect()
    console.log("Connected! Get!");
    var sql = "SELECT * from user";
    connection.query(sql, function (err, rows, fields) {
        if (!err) {
            let txt = "<h1>USER TABLE</h1>"
            txt += "<table border='1'>"
            txt += "<tr><td>ID</td><td>Name</td><td>Password</td></tr>";
            for (x = 0; x < rows.length; x++) {
                txt += "<tr><td>" + rows[x].id + "</td><td>" + rows[x].name + "</td><td>" + rows[x].email + "</td></tr>";
            }
            txt += "</table>";
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write("<html><body>");
            res.write(txt);
            res.write("</body></html>");
            res.end();

        } else
            console.log('Error while performing QUERY')
    });
    connection.end()
}

//Remove User
function deleteUser() {
    let idToDelete = req.body.id
    connection.connect()
    console.log("Connected!");
    var sql = `DELETE FROM user WHERE user_id = ?`;
    connection.query(sql,[idToDelete], function (err, result) {
        if (!err) {
            console.log('Deleted!')
        } else
            console.log('Error while performing QUERY')
        console.log(err)
    });
    connection.end()
}
