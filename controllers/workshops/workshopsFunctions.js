const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const config = require("../../config.json");
var connection = mysql.createConnection(dbConfig);

exports.addWorkshop = (name, date, teacher, description, img, vacancies, time, callback) => {
    connection.connect();
    const sql = `INSERT INTO workshop (name, date, teacher, description, img, vacancies, time) VALUES(?,?,?,?,?,?,?)`;

    connection.query(sql, [name, date, teacher, description, img, vacancies, time], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Added"
        })
    });
    connection.end();
}

exports.removeWorkshop = (id, callback) => {
    connection.connect();
    const sql = `DELETE FROM workshop WHERE workshop_id = ?`

    connection.query(sql, [id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Deleted"
        })
    })
    connection.end()
}

exports.updateWorkshop = (id, name, date, teacher, description, vacancies, time, callback) => {
    connection.connect();
    const sql = `UPDATE workshop SET name = ?, date = ?, teacher = ?, description = ?, vacancies = ?, time = ? WHERE workshop_id = ?`

    connection.query(sql, [name, date, teacher, description, vacancies, time, id], function (err, result) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Workshop Updated"
        })
    })
    connection.end()
}