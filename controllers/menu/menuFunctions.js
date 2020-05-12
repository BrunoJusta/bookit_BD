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


exports.searchMenu = (search, callback) => {
    connection.connect();
    if (search != '' || search != undefined) {
        let sql = `SELECT name, img, description from menu INNER JOIN menu_Type ON menu.name LIKE '%${search}%' AND menu.menu_type_id = menu_Type.menu_type_id `;
        connection.query(sql, function (error, rows, result) {
            if (error) callback(error);
            console.log(rows);
            callback(null, {
                success: true,
                message: "Search!"
            });
        });
    } else {
        let sql = `SELECT name, img, description from menu INNER JOIN menu_Type ON menu.menu_type_id = menu_Type.menu_type_id `;
        connection.query(sql, function (error, rows, result) {
            if (error) callback(error);
            console.log(rows);
            callback(null, {
                success: true,
                message: "All Menus!"
            })
        })
    }
    connection.end();
}