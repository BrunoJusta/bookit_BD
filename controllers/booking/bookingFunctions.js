const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);



exports.addBooking = (userID, menu, reason, date, time, numberPeople, school, outfit, observations, img, extras, decor, callback) => {
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
            decorBooking(lastId, decor, extras)
        }
    });
}

function decorBooking(booking_id, decor, extras) {

    for (let d = 0; d < decor.length; d++) {
        const sqlDecor = `INSERT INTO booking_Decor (decoration_id, booking_id) VALUES ( ? , ?)`
        connection.query(sqlDecor, [decor[d], booking_id], function (error, rows, results, fields) {
            if (!error) {
                extrasBooking(booking_id, extras)
            } else(error)
        });

    }
}

function extrasBooking(booking_id, extras) {

    for (let e = 0; e < extras.length; e++) {
        const sqlExtra = `INSERT INTO booking_Extra (booking_id, extra_id) VALUES ( ? , ?)`
        connection.query(sqlExtra, [booking_id, extras[e]], function (error, rows, results, fields) {
            if (error)
                connection.end();
        });
    }
}