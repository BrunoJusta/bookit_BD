const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const config = require("../../config.json");
var connection = mysql.createConnection(dbConfig);

exports.addArea = (name, description, img, callback) => {
    connection.connect();
    const sql = `INSERT INTO area (name, description, img) VALUES(?,?,?)`;
    connection.query(sql, [name, description, img], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results"
        })
    });
    connection.end();

}

exports.removeArea = (id, callback) => {
    connection.connect()
    let sql = `DELETE FROM area WHERE area_id = ?`;
    connection.query(sql, [id], function (error, result) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Deleted!"
        });
    });
    connection.end()
}

exports.updateArea = (name, description, id, callback) => {
    connection.connect()
    let sql = `UPDATE area SET name = ?, description = ? WHERE area_id = ?`;
    connection.query(sql, [name, description, id], function (error, result) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Area Updated!"
        });
    });
    connection.end();
};

exports.getDetails = (id, callback) => {
    connection.connect();
    let sql = `SELECT name, description, img FROM area WHERE area_id = ?`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows)
        callback(null, {
            success: true,
            message: "Get Details!"
        });
    });
};

exports.searchArea = (search, callback) => {
    connection.connect();
    if (search != '' || search != undefined) {
        let sql = `SELECT name, img FROM area WHERE name LIKE '%${search}%'`;
        connection.query(sql, function (error, rows, result) {
            if (error) callback(error);
            console.log(rows);
            callback(null, {
                success: true,
                message: "Search!"
            });
        });
    } else {
        let sql = `SELECT name, img FROM area`;
        connection.query(sql, function (error, rows, result) {
            if (error) callback(error);
            console.log(rows);
            callback(null, {
                success: true,
                message: "All Areas!"
            })
        })
    }
    connection.end();
}