// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});


function addAreasBooking(userID, area, reason, date, time, callback) {
    connection.connect();
    const sql = `INSERT INTO area_Booking (user_id, area_id, reason, date, duration, state_id, decline_txt) VALUES ( ? , ?, ?, ?, ?, ?, ?)`
    connection.query(sql, [userID, area, reason, date, time, 0, ""], function (error, results) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                message: "Pedido de Reserva Enviado!"
            })
            connection.end();
        }
    });
}


function editAreaBooking(id, state, decline, opinion, callback) {
    let sql
    var context = {
        "state": state,
        "decline": decline,
        "opinion": opinion
    }

    var columns = {
        "state": "state_id",
        "decline": "decline_txt",
        "opinion": "opinion"
    }

    connection.connect();
    sql = "UPDATE area_Booking SET ";
    Object.keys(context).forEach(function (key) {
        if (!(context[key] === null || context[key] === "" || context[key] === undefined))
            sql += columns[key] + "='" + context[key] + "',";
    });
    sql += " WHERE area_booking_id = ?";
    var n = sql.lastIndexOf(",");
    sql = sql.slice(0, n) + sql.slice(n).replace(",", "");

    connection.query(sql, [id], function (error, results) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Reserva Atualizada",
        })

    })
    console.log(state)
    if (state == 1) {
        aproveAreaNotification(id)
    } else if (state == 2) {
        refuseNotification(id)
    }
}

function aproveAreaNotification(id) {
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        console.log(rows)
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "A sua reverva da " + area + " foi aceite."
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote, [user_id, description, 0], function (error) {
                if (!error) {
                    connection.end()
                }
            })
        }
    })
}




function refuseNotification(id) {
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "A sua reverva da " + area + " foi recusada."
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote, [user_id, description, 0], function (error) {
                if (!error) {
                    connection.end()
                }
            })
        }
    })
}

function removeAreaBooking(id, callback) {
    connection.connect()
    let sql = `DELETE FROM area_Booking WHERE area_booking_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "Reserva Removida!"
        })
    });
    connection.end()
}

function areasBooking(callback) {
    connection.connect()
    let sql = `SELECT area_booking_id, user.name as username, user.lastName, user.email, area.name, date, duration, state_booking.description FROM area_Booking inner join user on area_Booking.user_id=user.user_id inner join area on area_Booking.area_id = area.area_id inner join state_booking on area_Booking.state_id = state_booking.state_id`
    connection.query(sql, function (error, rows, fields) {
        if (error) callback(error);
        callback(null, {
            sucess: true,
            data: rows
        })
    })
}



module.exports = {
    addAreasBooking: addAreasBooking,
    removeAreaBooking: removeAreaBooking,
    areasBooking: areasBooking,
    editAreaBooking: editAreaBooking
}