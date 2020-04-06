const dbConfig = require("./db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config.json");
var connection = mysql.createConnection(dbConfig);

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

//Register User
function insertUser(req, ) {
    //Variaveis
    let name = req.body.name
    let lastName = req.body.lastName
    let number = req.body.number
    let img = ""
    let email = req.body.email
    let birthDate = req.body.birthDate
    let school = 0
    let userType_id = 1

    //verify Password
    if (req.body.password === req.body.password2) {
        //Encrypting Password
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            connection.connect();
            //Get School from mail
            const sql2 = `SELECT school_id FROM school WHERE INSTR(?, school) > 0;`
            connection.query(sql2, [email], function (error, rows, results, fields) {
                if (!error) {
                    school = rows[0].school_id
                    //Insert user into DB
                    const sql = `INSERT INTO user (name, lastName, email, password, number, img, userType_id, school_id, birthDate) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?)`;
                    connection.query(sql, [name, lastName, email, hash, number, img, userType_id, school, birthDate], function (error, results, fields) {
                        if (error) throw error;
                        console.log('The solution is: ', results);
                    });
                    connection.end();
                } else {
                    console.log('Error while performing QUERY')
                    console.log(error)
                }
            });
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
        connection.connect();
        //Get info from user
        const sql2 = `SELECT name, email, password FROM user WHERE email = ?;`
        connection.query(sql2,[email], function (error, rows, results, fields) {
            if (!error) {
                console.log(rows)
                //Verify Password
                bcrypt.compare(password, rows[0].password, function (err, res) {
                    if(err){
                        console.log(error)
                    }
                    //Create Token
                    if (res) {
                        console.log("works")
                        let token = jwt.sign({
                                email: email,
                            },
                            config.secret, {
                                expiresIn: '24h' // expires in 24 hours
                            }
                        );
                        // return the JWT token for the future API calls
                        result.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });
                    } else {
                        console.log("Password Invalida")

                    }
                })
            } else {
                console.log('Error while performing QUERY')
                console.log(error)
            }
            connection.end();
        });
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
    LoginValidation: LoginValidation
}