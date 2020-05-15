const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const config = require("../../config.json");
var connection = mysql.createConnection(dbConfig);

function addArea(name, description, img, callback) {
    let id
    connection.connect();
    const sql = `INSERT INTO area (name, description, img) VALUES(?,?,?)`;
    connection.query(sql, [name, description, img], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results"
        })
        id = results.insertId;
        addAreaNotification(id)
    });
}

function addAreaNotification(id) {
    const sqlArea = "Select area.name from area where area_id = ?"
    connection.query(sqlArea, [id], function (error, rows, fields) {
        if (!error) {
            let areaName = rows[0].name
            let description = "A área " + areaName + " foi adicionada."
            const sqlNote = `insert into notification (user_id, description, type) select user_id, ?,? from user where user.userType_id = ? or user.userType_id = ?;`
            connection.query(sqlNote, [description, 0, 0, 1], function (error) {
                if (!error) {
                    connection.end();
                } else {
                    console.log(error)
                }
            })
        }
    })
}

function removeArea(id, callback) {
    connection.connect()
    removeAreaNotification(id);
    let sql = `DELETE FROM area WHERE area_id = ?`;
    connection.query(sql, [id], function (error, result) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Deleted!"
        });
        connection.end()
    });
}

function removeAreaNotification(id) {
    const sqlArea = "Select area.name from area where area_id = ?"
    connection.query(sqlArea, [id], function (error, rows, fields) {
        if (!error) {
            let areaName = rows[0].name
            let description = "A área " + areaName + " foi eliminada."
            const sqlNote = `insert into notification (user_id, description, type) select user_id, ?,? from user where user.userType_id = ? or user.userType_id = ?;`
            connection.query(sqlNote, [description, 0, 0, 1], function (error) {
                if (!error) {}
            })
        }
    })
}

function updateArea(name, description, id, callback) {
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

function getAreas(callback) {
    connection.connect();
    let sql = `SELECT * FROM area`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows)
        callback(null, {
            success: true,
            message: "Get areas!"
        });
    });
};

module.exports = {
    addArea: addArea,
    removeArea: removeArea,
    updateArea: updateArea,
    getAreas: getAreas
}


// exports.searchArea = (search, callback) => {
//     connection.connect();
//     if (search != '' || search != undefined) {
//         let sql = `SELECT name, img FROM area WHERE name LIKE '%${search}%'`;
//         connection.query(sql, function (error, rows, result) {
//             if (error) callback(error);
//             console.log(rows);
//             callback(null, {
//                 success: true,
//                 message: "Search!"
//             });
//         });
//     } else {
//         let sql = `SELECT name, img FROM area`;
//         connection.query(sql, function (error, rows, result) {
//             if (error) callback(error);
//             console.log(rows);
//             callback(null, {
//                 success: true,
//                 message: "All Areas!"
//             })
//         })
//     }
//     connection.end();
// }