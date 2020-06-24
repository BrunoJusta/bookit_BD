const bcrypt = require('bcrypt');
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysqlhash
const userFunctions = require("./userFunctions")
const jwt = require('jsonwebtoken')
const config = require("../../config.json")
var connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
//Register User
function insertUser(req, res) {
    //Variaveis
    let name = req.body.name
    let img
    let lastName = req.body.lastName
    let number = req.body.number
    let imgMale = "../../assets/userImgs/male.svg"
    let imgFemale = "../../assets/userImgs/female.svg"
    let email = req.body.email
    let birthDate = req.body.birthDate
    let userType_id = 1
    let genre = req.body.genre


    if (genre == "male") {
        img = imgMale
    } else {
        img = imgFemale
    }
    //verify Password = 123AvesChines
    if (req.body.password === req.body.password2) {
        //Encrypting Password
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            const sql2 = `SELECT school_id FROM school WHERE INSTR(?, school) > 0;`
            connection.query(sql2, [email], function (error, rows, results, fields) {
                if (!error) {
                    let school = rows[0].school_id
                    //Insert user into DB
                    const sql = `INSERT INTO user (name, lastName, email, password, number, img, userType_id, school_id, birthDate, genre) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    connection.query(sql, [name, lastName, email, hash, number, img, userType_id, school, birthDate, genre], function (error, results, fields) {
                        if (!error){

                            res.status(200).send("Criado com sucesso")
                        }
                        else{
                            let message = "Incorrect data"
                            res.status(404).send(message)
                        }
                    });
                } else {
                    let message = "Incorrect data"
                    res.status(404).send(message)

                }
            });
        })
    } else {
        let message = "Incorrect data"
        res.status(404).send(message)
    }
}



//Login User
class LoginValidation {


    login(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let passwordSame = false
 
        const query = `SELECT * FROM user, school WHERE email = ? AND user.school_id = school.school_id;`
        connection.query(query, [email], function (err, result) {
            if (!err) {
                let message = "success"
                if (result.length == 0) {
                    message = "Incorrect data"
                } else {
                    passwordSame = bcrypt.compareSync(password, result[0].password)
                    if (passwordSame == false) {
                        result = []
                        message = "Incorrect data"
    
                    } else if (passwordSame && result[0].userType_id == 2) {
                        result = []
                        message = "Incorrect data"
                    }
                }
                if (result.length > 0) {
                    const sqlCount = `SELECT COUNT(*) as count FROM notification WHERE user_id = ? AND type = 0;`
                    connection.query(sqlCount, [result[0].user_id], function (error, countRows, results, fields) {
                        if (!error) {
                        }
                        let count
                        if(countRows === undefined || countRows === null){
                            count = 0
                        }
                        else{
                            count = countRows[0].count 
                        }
                        const token = jwt.sign({
                            id: result[0].user_id,
                            name: result[0].name,
                            lastName: result[0].lastName,
                            number: result[0].number,
                            school: result[0].school,
                            email: email,
                            birthDate: result[0].birthDate,
                            notifications: count,
                            type: result[0].userType_id,
                        }, config.secret)
                        res.status(200).send({
                            token: token,
                            response: result
                        })
                    });
                   
                } else {
                    res.status(404).send(message)
                }
            } else {
                let message = "Error while performing Query."
                console.log('Error while performing Query.', err);
                res.status(500).send(message)
            }
        });
    }

    index(req, res) {
        res.json({
            success: true,
            message: 'Index page',
        });
    }
}


function logout(req, result) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    console.log(token)
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    userFunctions.logout(token, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}


//Remove User
function deleteUser(req, result) {
    let id = req.params.id

    userFunctions.deleteUser(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}


function edit(req, res) {
    let id = req.params.id
    let oldPassword = req.body.oldPassword
    let newPassword = req.body.newPassword
    let newPassword2 = req.body.newPassword2
    let number = req.body.number
    let userType = req.body.userType
    if (newPassword != "") {
        if (newPassword === newPassword2) {
            bcrypt.hash(newPassword, 10, function (err, hash) {
                userFunctions.editUser(id, oldPassword, hash, number, userType, (error, success) => {
                    if (error) {
                        throw error;
                        return;
                    }
                    res.json(success)
                })
            })
        } else {
            console.log("Passwords não coincidem")
        }
    } else {
        userFunctions.editUser(id, oldPassword, newPassword, number, userType, (error, success) => {
            if (error) {
                throw error;
                return;
            }
            res.json(success)
        })
    }
}

function changeAvatar(req, res) {
    let idToChange = req.params.id
    let newImg = req.body.newImg
    userFunctions.changeAvatar(idToChange, newImg, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        res.json(success)
    })
}

function getUsers(req, result) {
    userFunctions.getUsers((error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function menuBookingsById(req, result) {
    let idToChange = req.params.id
    userFunctions.menuBookingsById(idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function areaBookingsById(req, result) {
    let idToChange = req.params.id
    userFunctions.areaBookingsById(idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function workshopBookingsById(req, result) {
    let idToChange = req.params.id
    userFunctions.workshopBookingsById(idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function notificationsById(req, result) {
    let idToChange = req.params.id
    userFunctions.notificationsById(idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function archivationsById(req, result) {
    let idToChange = req.params.id
    userFunctions.archivationsById(idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}


function avatarById(req, result) {
    let id = req.params.id
    userFunctions.avatarById(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function archive(req, result) {
    let idToChange = req.params.id
    let idUser = req.params.userID
    userFunctions.archive(idUser, idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function deleteNotification(req, result) {
    let idToChange = req.params.id
    let idUser = req.params.userID
    userFunctions.deleteNotification(idUser, idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}


//LOGOUT

module.exports = {
    insertUser: insertUser,
    deleteUser: deleteUser,
    edit: edit,
    changeAvatar: changeAvatar,
    getUsers: getUsers,
    menuBookingsById: menuBookingsById,
    areaBookingsById: areaBookingsById,
    workshopBookingsById: workshopBookingsById,
    notificationsById: notificationsById,
    archivationsById: archivationsById,
    archive: archive,
    deleteNotification: deleteNotification,
    logout: logout,
    LoginValidation: LoginValidation,
    avatarById: avatarById,
}