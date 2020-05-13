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
        aproveAreaNotification(id)
    })
}

function aproveAreaNotification(id) {
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "A sua reverva da " + area +" foi aceite." 
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote,[user_id,description,0],function(error){
                if(!error){
                    connection.end()
                }
            })
        }
    })
}


exports.refuseAreaBooking = (id, decline, callback) => {
    connection.connect();
    const sql = `UPDATE area_Booking SET state_id = ?, decline_txt = ? WHERE area_booking_id = ?`
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
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "A sua reverva da " + area +" foi recusada." 
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote,[user_id,description,0],function(error){
                if(!error){
                    connection.end()
                }
            })
        }
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

exports.tableAreaBooking = (callback) => {
    connection.connect()
    let sql = `SELECT user.name, user.lastName user.email, area.area_id, date, duration, state_booking.description FROM area_Booking inner join user on area_Booking.user_id=user.user_id inner join area on area_Booking.area_id = area.area_id inner join state_booking on area_Booking.state_id = state_booking.state_id `
    connection.query(sql, function (error, rows, fields) {
        if (error) callback(error);
        console.log(rows)
        callback(null, {
            sucess: true,
            message: "All Areas Booking"
        })
    })
}


//Accept  booking e area booking notification

//Delete area, menu e workshop notification

//add area, menu e workshop notification

exports.giveOpinion = (id, opinion, callback) => {
    connection.connect();
    const sql = `UPDATE area_Booking SET opinion = ? WHERE area_booking_id = ?`
    connection.query(sql, [opinion, id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
        connection.end();
    })
}
