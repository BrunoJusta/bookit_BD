const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);



exports.addBooking = (userID, menuName, reason, date, time, numberPeople, school, outfit, observations, img, extras, decor, callback) => {
    connection.connect();
    const sqlOutfit = `SELECT outfit_id from outfit WHERE name = ?`
    connection.query(sqlOutfit, [outfit], function (error, rows) {
        if (!error) {
            let outfit_id = rows[0].outfit_id
            const sqlSchool = `SELECT school_id from school WHERE school = ?`
            connection.query(sqlSchool, [school], function (error, rows) {
                if (!error) {
                    let schoolId = rows[0].school_id
                    const sqlMenu = `SELECT kit_id from Kit_Menu WHERE name = ?`
                    connection.query(sqlMenu, [menuName], function (error, rows) {
                        if (!error) {
                            let kit_id = rows[0].kit_id
                            const sql = `INSERT INTO booking (user_id, kit_id, reason, date, duration, numberPeople, school_id, outfit_id,
                                         state_id, observations, img) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                            connection.query(sql, [userID, kit_id, reason, date, time, numberPeople, schoolId, outfit_id, 0, observations, img], function (error, results) {
                                if (error){
                                    callback(error);
                                } 
                                else{
                                    callback(null, {
                                        success: true,
                                        message: "results"
                                    })
                                    let lastId = results.insertId
                                    decorBooking(lastId, decor, extras)
                                }
                            });
                        } else {
                            callback(error);
                        }
                    })
                } else callback(error);
            })
        } else callback(error)ou
    })
}



function decorBooking(booking_id, decor, extras){
    
    for(let d=0; d<decor.length; d++){

        const sqlDecorID = `SELECT decoration_id from decoration WHERE name = ?`
        connection.query(sqlDecorID, [decor[d]], function (error, rows, fields) {
            if(!error){
                let id = rows[0].decoration_id
                const sqlDecor = `INSERT INTO booking_Decor (decoration_id, booking_id) VALUES ( ? , ?)`
                connection.query(sqlDecor, [id, booking_id], function (error, rows, results, fields) {
                    if (!error){
                        extrasBooking(booking_id, extras)
                    }
                    else(error)
                });
            }
            else(error)
        });
    }
}




function extrasBooking(booking_id, extras){

    for(let e=0; e<extras.length; e++){
        const sqlExtraID = `SELECT extra_id from extra WHERE name = ?`
        connection.query(sqlExtraID, [extras[e]], function (error, rows, fields) {
            if(!error){
                let id = rows[0].extra_id
                const sqlExtra = `INSERT INTO booking_Extra (booking_id, extra_id) VALUES ( ? , ?)`
                connection.query(sqlExtra, [booking_id, id], function (error, rows, results, fields) {
                    if (error)
                    connection.end();
                });
            }
            else(error)
        });
    }
}