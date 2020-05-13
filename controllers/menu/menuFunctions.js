const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);


//MENU
exports.addMenu = (name, menuType, img,ing, callback) => {
    connection.connect();
    const sql = `INSERT INTO menu (name, menu_type_id , img, popularity) VALUES(?,?,?,?)`;
    connection.query(sql, [name, menuType, img, 0], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Menu Added!"
        })
        let id = results.insertId
        menuIng(ing, id)
    });
};


exports.addMenuPlusType = (name, newType, img,ing, callback) => {
    connection.connect();
    const sql = `INSERT INTO menu_Type (description) VALUES(?)`;
    connection.query(sql, [newType], function (error, result, fields) {
        if(!error){
            const sql2 = `INSERT INTO menu (name, menu_type_id , img, popularity) VALUES(?,?,?,?)`;
            connection.query(sql2, [name, result.insertId, img, 0], function (error, results, fields) {
                if (error) callback(error);
                callback(null, {
                    success: true,
                    message: "Menu Added!"
                })
                let id = results.insertId
                menuIng(ing, id)
            });
        }
    });
};


function menuIng(ing, id){
    for (let i = 0; i < ing.length; i++) {
        const sqlIng = `INSERT INTO menu_Ingredient (menu_id, ingredient_id) VALUES ( ? , ?)`
        connection.query(sqlIng, [id, ing[i]], function (error, rows, results, fields) {
            if (i === ing.length) {
                connection.end();
            }
        });
    }

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