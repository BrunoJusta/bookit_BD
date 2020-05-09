const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);


//MENU
exports.addMenu = (name, menuType, img, callback) => {
    connection.connect();
    const sql = `INSERT INTO menu (name, menu_type_id , img, popularity) VALUES(?,?,?,?)`;
    connection.query(sql, [name, menuType, img, 0], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Menu Added!"
        })
    });
    connection.end();
};

//MENU_TYPE
exports.addMenuType = (description, callback) => {
    connection.connect();
    const sql = `INSERT INTO menu_Type (description) VALUES(?)`;
    connection.query(sql, [description], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "results",
        })
    });
    connection.end();
}

//ordenar por popularidade
exports.orderByPopularity = (callback) => {
    connection.connect();
    const sql = `SELECT * FROM menu ORDER BY popularity DESC;`;
    connection.query(sql, function (error, rows, results, fields) {
        if (error) {
            callback(error);
        } else {
            console.log(rows)
            callback(null, {
                success: true,
                message: "Ordered!",
            })
        }
    });
    connection.end();
}