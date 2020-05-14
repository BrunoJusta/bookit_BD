const bcrypt = require('bcrypt');
const userFunctions = require("./userFunctions")
const jwt = require('jsonwebtoken')
const config = require("../../config.json")

//Register User
function insertUser(req, result) {
    //Variaveis
    let name = req.body.name
    let img
    let lastName = req.body.lastName
    let number = req.body.number
    let imgMale = "../../assets/userImgs/male.svg"
    let imgFemale = "../../assets/userImgs/female.svg"
    let email = req.body.email
    let birthDate = req.body.birthDate
    let school = 0
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
            userFunctions.register(name, lastName, email, hash, number, img, userType_id, school, birthDate, genre, (error, success) => {
                if (error) {
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
        userFunctions.login(email, password, (error, success) => {
            if (error) {
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

function changePassword(req, res) {
    let idToChange = req.params.id
    let newPassword = req.body.newPassword

    bcrypt.hash(newPassword, 10, function (err, hash) {
        userFunctions.changePassword(idToChange, hash, (error, success) => {
            if (error) {
                throw error;
                return;
            }
            res.json(success)
        })
    })
}

function changeNumber(req, res) {
    let idToChange = req.params.id
    let newNumber = req.body.newNumber

    userFunctions.changeNumber(idToChange, newNumber, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        res.json(success)
    })
}

function changeType(req, res) {
    let idToChange = req.params.id
    let newType = req.body.type

    userFunctions.changeType(idToChange, newType, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        res.json(success)
    })
}


function changeAvatar(req, res) {
    let idToChange = req.params.id
    let newImg = req.file

    userFunctions.changeAvatar(idToChange, newImg.path, (error, success) => {
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

function archive(req, result) {
    let idToChange = req.params.id
    userFunctions.archive(idToChange, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function deleteNotification(req, result) {
    let idToChange = req.params.id
    userFunctions.deleteNotification(idToChange, (error, success) => {
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
    changePassword: changePassword,
    changeNumber: changeNumber,
    changeAvatar: changeAvatar,
    changeType: changeType,
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
}