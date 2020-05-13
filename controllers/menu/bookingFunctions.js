const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);



exports.addBooking = (userID, menu, reason, date, time, numberPeople, school, outfit, observations, extras, decor, ing, callback) => {
    connection.connect();
    const sql = `INSERT INTO booking (user_id, menu_id, reason, date, duration, numberPeople, school_id, outfit_id, state_id, observations,decline_txt) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(sql, [userID, menu, reason, date, time, numberPeople, school, outfit, 0, observations, ""], function (error, results) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                message: "results"
            })
            let lastId = results.insertId
            DecorBooking(lastId, decor, extras, ing)
        }
    });
}

function DecorBooking(booking_id, decor, extras, ing) {

    for (let d = 0; d < decor.length; d++) {
        const sqlDecor = `INSERT INTO booking_Decor (decoration_id, booking_id) VALUES ( ? , ?)`
        connection.query(sqlDecor, [decor[d], booking_id], function (error, rows, results, fields) {
            if (!error) {
                ExtrasBooking(booking_id, extras, ing)
            } else(error)
        });

    }
}

function ExtrasBooking(booking_id, extras, ing) {

    for (let e = 0; e < extras.length; e++) {
        const sqlExtra = `INSERT INTO booking_Extra (booking_id, extra_id) VALUES ( ? , ?)`
        connection.query(sqlExtra, [booking_id, extras[e]], function (error, rows, results, fields) {
            if (error)
                AddOnsBooking(booking_id, ing)

        });
    }

}


function AddOnsBooking(booking_id, ing) {

    for (let i = 0; i < ing.length; i++) {
        const sqlIng = `INSERT INTO addOn (booking_id, ingredient_id) VALUES ( ? , ?)`
        connection.query(sqlIng, [booking_id, ing[i]], function (error, rows, results, fields) {
            if (i === ing.length) {
                connection.end();
            }
        });
    }

}

exports.approveBooking = (id, callback) => {

    connection.connect();
    const sql = `UPDATE booking SET state_id = ? WHERE booking_id = ?`
    connection.query(sql, [1, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
        approveNotification(id)

    })

}

function approveNotification(id) {
    const sqlMenu = "Select menu.name, menu_Type.description, booking.user_id from menu, booking, menu_Type where  booking_id = ? and menu.menu_id = booking.menu_id and menu.menu_type_id = menu_Type.menu_type_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let menu = rows[0].name
            let type = rows[0].description
            let user_id = rows[0].user_id
            console.log(menu + " " + type)
            let description = "A sua reverva do menu " + type + " " + menu +" foi aceite."
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote,[user_id,description,0],function(error){
                if(!error){
                    connection.end()
                }
            })

        }
    })
}

exports.refuseBooking = (id, decline, callback) => {

    connection.connect();
    const sql = `UPDATE booking SET state_id = ?, decline_txt = ? WHERE booking_id = ?`
    connection.query(sql, [2, decline, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
      refuseNotification(id)

    })

}


function refuseNotification(id) {
    const sqlMenu = "Select menu.name, menu_Type.description, booking.user_id from menu, booking, menu_Type where  booking_id = ? and menu.menu_id = booking.menu_id and menu.menu_type_id = menu_Type.menu_type_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let menu = rows[0].name
            let type = rows[0].description
            let user_id = rows[0].user_id
            console.log(menu + " " + type)
            let description = "A sua reverva do menu " + type + " " + menu +" foi recusada."
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote,[user_id,description,0],function(error){
                if(!error){
                    connection.end()
                }
            })

        }
    })
}

exports.removeBooking = (id, callback) => {
    connection.connect()
    let sql = `DELETE FROM booking WHERE booking_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "Deleted!"
        })
    });
    connection.end()
}

exports.getBookings = (callback) => {
    connection.connect()
    let sql = `select  menu_Type.description,menu.name, date, duration, user.name, user.lastName, user.email, state_booking.description from booking 
                inner join menu on menu.menu_id = booking.menu_id
                inner join menu_Type on menu.menu_type_id = menu_Type.menu_type_id
                inner join user on booking.user_id = user.user_id
                inner join state_booking on booking.state_id = state_booking.state_id`;
    connection.query(sql, function (err, rows, fields, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "results!"
        })
        console.log(rows)
    });
    connection.end()
}

exports.getMotive = (id, callback) => {
    connection.connect()
    let sql = `SELECT decline_txt FROM booking WHERE booking_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "motive!"
        })
    });
    connection.end()
}


exports.opinionBooking = (id, opinion, callback) => {
    connection.connect();
    const sql = `UPDATE booking SET opinion = ?  WHERE booking_id = ?`
    connection.query(sql, [opinion, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
        opinionNotification(id)

    })

}

function opinionNotification(id) {
    const sqlMenu = "Select menu.name, menu_Type.description from menu, booking, menu_Type where  booking_id = ? and menu.menu_id = booking.menu_id and menu.menu_type_id = menu_Type.menu_type_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let menu = rows[0].name
            let type = rows[0].description
            console.log(menu + " " + type)
            let description = "Recebeu uma nova opiniao no menu " + type + " " + menu +"."
            const sqlNote = `insert into notification (user_id, description, type) select user_id, ?,? from user where user.userType_id = ?;`
            connection.query(sqlNote,[description,0,0],function(error){
                if(!error){
                    connection.end()
                }
            })

        }
    })
}