const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);


//KIT_MENU
exports.addKitMenu = (name, menuType, img, callback) => {
    connection.connect();
    const sql = `INSERT INTO Kit_Menu (name, kit_menu_type_id , img, popularity) VALUES(?,?,?,?)`;
    connection.query(sql, [name, menuType, img, 0], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Kit Menu Added!"
        })
    });
    connection.end();
};

//KIT_MENU_TYPE
exports.addKitMenuType = (description, callback) => {
    connection.connect();
    const sql = `INSERT INTO kit_Menu_Type (description) VALUES(?)`;
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
    const sql = `SELECT * FROM Kit_Menu ORDER BY popularity DESC;`;
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