// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysqlhash
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config.json");
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});

function login(email, password, callback) {
    connection.connect();
    //Get info from user
    const sql2 = `SELECT name, email, password FROM user WHERE email = ?;`
    connection.query(sql2, [email], function (error, rows, results, fields) {
        if (!error) {
            console.log(rows)
            //Verify Password
            bcrypt.compare(password, rows[0].password, function (err, res) {
                if (err) {
                    callback(err)
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
                    callback(null, {
                        success: true,
                        message: 'Sessão Iniciada',
                        token: token
                    })
                } else {
                    console.log("Dados Invalidos")

                }
            })
        } else {
            callback(error)
        }
        connection.end();
    });
}

function register(name, lastName, email, hash, number, img, userType_id, birthDate, genre, callback) {
    connection.connect();
    //Get School from mail
    const sql2 = `SELECT school_id FROM school WHERE INSTR(?, school) > 0;`
    connection.query(sql2, [email], function (error, rows, results, fields) {
        if (!error) {
            console.log(rows)
            let school = rows[0].school_id

            //Insert user into DB
            const sql = `INSERT INTO user (name, lastName, email, password, number, img, userType_id, school_id, birthDate, genre) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, [name, lastName, email, hash, number, img, userType_id, school, birthDate, genre], function (error, results, fields) {
                if (error) callback(error);
                callback(null, {
                    success: true,
                    message: "Conta criada com sucesso!"
                })
            });
            connection.end();
        } else {
            callback(error)
        }
    });
}



function editUser(id, newPassword, newNumber, newType, callback) {
    let sql
    var context = {
        "newPassword": newPassword,
        "newNumber": newNumber,
        "newType": newType,
    }

    var columns = {
        "newPassword": "password",
        "newNumber": "number",
        "newType": "userType_id",
    }

    connection.connect();
    sql = "UPDATE  user SET ";
    Object.keys(context).forEach(function (key) {
        if (!(context[key] === null || context[key] === "" || context[key] === undefined))
            sql += columns[key] + "='" + context[key] + "',";
    });
    sql += " WHERE  user_id  = ?";
    var n = sql.lastIndexOf(",");
    sql = sql.slice(0, n) + sql.slice(n).replace(",", "");

    connection.query(sql, [id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Dados Atualizados!",
        })

    })
}


function changeAvatar(id, newImg, callback) {
    connection.connect();
    var sql = `UPDATE user SET img = ? WHERE user_id = ?`
    connection.query(sql, [newImg, id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Imagem de Perfil Atualizada!"
        })
    })
    connection.end()
}

function logout(token, callback) {
    connection.connect();
    let sql = `INSERT INTO blacklist(token) VALUES(?)`
    connection.query(sql, [token], function (err, result) {
        if (err) callback(err);
        callback(null, {
            sucess: true,
            message: "Sessão Terminada!"
        })
    });
    connection.end();
}

function deleteUser(id, callback) {
    connection.connect()
    console.log("Connected!");
    var sql = `DELETE FROM user WHERE user_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Utilizador Eliminado!"
        })
    });
    connection.end()
}


function getUsers(callback) {
    connection.connect();
    let sql = `SELECT name, lastName, email, number, user_Type.type FROM user, user_Type WHERE user.userType_id = user_Type.userType_id;`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection.end();
}

function menuBookingsById(id, callback) {
    connection.connect();
    let sql = `select booking_id , menu.name, menu_Type.description, menu.img, date, duration, school.school, state_booking.description 
    from booking, menu, menu_Type, school, state_booking
    where booking.menu_id = menu.menu_id and menu.menu_type_id = menu_Type.menu_type_id 
    and booking.school_id = school.school_id and booking.state_id = state_booking.state_id 
    and booking.user_id = ?;
    `;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection.end();
}

function areaBookingsById(id, callback) {
    connection.connect();
    let sql = `select  area_booking_id, area.name, date, duration, state_booking.description 
    from area_Booking, area, state_booking
    where area_Booking.area_id = area.area_id and area_Booking.state_id = state_booking.state_id 
    and area_Booking.user_id = ?;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection.end();
}


function workshopBookingsById(id, callback) {
    connection.connect();
    let sql = `select workshop.workshop_id, name, date, duration from workshop, inscription
    where workshop.workshop_id = inscription.workshop_id and inscription.user_id = ?;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection.end();
}

function notificationsById(id, callback) {
    connection.connect();
    let sql = `select notification_id, user_id, description from notification
    where notification.user_id = ? and notification.type = 0;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection.end();
}

function archivationsById(id, callback) {
    connection.connect();
    let sql = `select notification_id, user_id, description from notification
    where notification.user_id = ? and notification.type = 1;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection.end();
}

function archive(idUser, id, callback) {
    connection.connect();
    let sql = `update notification set type = 1 where notification_id = ? and user_id=?;`;
    connection.query(sql, [id, idUser], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "Notificação Arquivada!"
        })
    })
    connection.end();
}

function deleteNotification(idUser, id, callback) {
    connection.connect();
    let sql = `delete from notification where notification_id = ? and user_id=?;`;
    connection.query(sql, [id, idUser], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "Notificação Eliminda!"
        })
    })
    connection.end();
}

module.exports = {
    login: login,
    register: register,
    editUser: editUser,
    changeAvatar: changeAvatar,
    logout: logout,
    deleteUser: deleteUser,
    getUsers: getUsers,
    menuBookingsById: menuBookingsById,
    areaBookingsById: areaBookingsById,
    workshopBookingsById: workshopBookingsById,
    notificationsById: notificationsById,
    archivationsById: archivationsById,
    archive: archive,
    deleteNotification: deleteNotification
}