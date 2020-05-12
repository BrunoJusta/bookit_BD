const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);



exports.addAreasBooking = (userID, area, reason, date, time, callback) => {
    connection.connect();
    const sql = `INSERT INTO area_Booking (user_id, area_id, reason, date, duration, state_id, decline_txt) VALUES ( ? , ?, ?, ?, ?, ?, ?)`
    connection.query(sql, [userID, area, reason, date, time, 0, ""], function (error, results) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                message: "results"
            })
            connection.end();
        }
    });
}


exports.approveAreaBooking = (id, callback) => {

    connection.connect();
    const sql = `UPDATE area_Booking SET state_id = ? WHERE area_booking_id = ?`
    connection.query(sql, [1, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
        connection.end();

    })

}


exports.refuseAreaBooking = (id, decline, callback) => {

    connection.connect();
    const sql = `UPDATE area_Booking SET state_id = ?, decline_txt = ? WHERE area_booking_id = ?`
    connection.query(sql, [2,decline, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
        connection.end();

    })

}

exports.removeAreaBooking = (id, callback) => {
    connection.connect()
    let sql = `DELETE FROM area_Booking WHERE area_booking_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "Deleted!"
        })
    });
    connection.end()
}