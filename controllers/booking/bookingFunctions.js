const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);



exports.addBooking = (userID, menu, reason, date, time, numberPeople, school, outfit, observations, img, extras, decor, ing, callback) => {
    connection.connect();
    const sql = `INSERT INTO booking (user_id, kit_id, reason, date, duration, numberPeople, school_id, outfit_id, state_id, observations, img) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(sql, [userID, menu, reason, date, time, numberPeople, school, outfit, 0, observations, img], function (error, results) {
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
        connection.end();

    })

}


exports.refuseBooking = (id, callback) => {

    connection.connect();
    const sql = `UPDATE booking SET state_id = ? WHERE booking_id = ?`
    connection.query(sql, [2, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
        connection.end();

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