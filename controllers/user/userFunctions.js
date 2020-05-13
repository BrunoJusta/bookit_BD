const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config.json");
var connection = mysql.createConnection(dbConfig);

exports.login = (email, password, callback) => {

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
                        message: 'Authentication successful!',
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

exports.register = (name, lastName, email, hash, number, img, userType_id, school, birthDate, genre, callback) => {
    connection.connect();
    //Get School from mail
    const sql2 = `SELECT school_id FROM school WHERE INSTR(?, school) > 0;`
    connection.query(sql2, [email], function (error, rows, results, fields) {
        if (!error) {
            school = rows[0].school_id
            //Insert user into DB
            const sql = `INSERT INTO user (name, lastName, email, password, number, img, userType_id, school_id, birthDate, genre) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, [name, lastName, email, hash, number, img, userType_id, school, birthDate, genre], function (error, results, fields) {
                if (error) callback(error);
                callback(null, {
                    success: true,
                    message: "results"
                })
            });
            connection.end();
        } else {
            callback(error)
        }
    });
}

exports.changePassword = (id, newPassword, callback) => {
    connection.connect();
    var sql = `UPDATE user SET password = ? WHERE user_id = ?`
    connection.query(sql, [newPassword, id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Password changed!"
        })
    })
    connection.end()
}

exports.changeNumber = (id, newNumber, callback) => {
    connection.connect();
    var sql = `UPDATE user SET number = ? WHERE user_id = ?`
    connection.query(sql, [newNumber, id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Number changed!"
        })
    })
    connection.end()
}

exports.changeType = (id, newType, callback) => {
    connection.connect();
    var sql = `UPDATE user SET userType_id = ? WHERE user_id = ?`
    connection.query(sql, [newType, id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Type changed!"
        })
    })
    connection.end()
}

exports.changeAvatar = (id, newImg, callback) => {
    connection.connect();
    var sql = `UPDATE user SET img = ? WHERE user_id = ?`
    connection.query(sql, [newImg, id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Avatar changed!"
        })
    })
    connection.end()
}

exports.deleteUser = (id, callback) => {
    connection.connect()
    console.log("Connected!");
    var sql = `DELETE FROM user WHERE user_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Deleted!"
        })
    });
    connection.end()
}


exports.getUsers = (callback) => {
    connection.connect();
    let sql = `SELECT name, lastName, email, number, user_Type.type FROM user, user_Type WHERE user.userType_id = user_Type.userType_id;`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "Users Table!"
        })
    })
    connection.end();
}

exports.menuBookingsById = (id,callback) => {
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
            message: "menu bookings by id Table!"
        })
    })
    connection.end();
}

exports.areaBookingsById = (id,callback) => {
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
            message: "area bookings by id Table!"
        })
    })
    connection.end();
}


exports.workshopBookingsById = (id,callback) => {
    connection.connect();
    let sql = `select workshop.workshop_id, name, date, duration from workshop, inscription
    where workshop.workshop_id = inscription.workshop_id and inscription.user_id = ?;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "workshop bookings by id Table!"
        })
    })
    connection.end();
}

exports.notificationsById = (id,callback) => {
    connection.connect();
    let sql = `select notification_id, user_id, description from notification
    where notification.user_id = ? and notification.type = 0;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "notifications by id Table!"
        })
    })
    connection.end();
}

exports.archivationsById = (id,callback) => {
    connection.connect();
    let sql = `select notification_id, user_id, description from notification
    where notification.user_id = ? and notification.type = 1;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "archivations by id Table!"
        })
    })
    connection.end();
}

exports.archive = (id,callback) => {
    connection.connect();
    let sql = `update notification set type = 1 where notification_id = ?;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "Archived!"
        })
    })
    connection.end();
}

exports.deleteNotification = (id,callback) => {
    connection.connect();
    let sql = `delete from notification where notification_id = ?;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "notification deleted!"
        })
    })
    connection.end();
}