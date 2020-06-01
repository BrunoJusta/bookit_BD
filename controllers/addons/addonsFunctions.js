// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});

function addIngredient(name, type, callback) {
    connection;
    const sql = `INSERT INTO ingredient (name, type) VALUES(?, ?)`;
    connection.query(sql, [name, type], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingrediente Adicionado!",
        });
    });
    connection;
}

function removeIngredient(id, callback) {
    connection;
    const sql = `DELETE FROM ingredient WHERE ingredient_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingrediente Removido!"
        });
    });
    connection;
}

function addDecor(name, callback) {
    connection;
    const sql = `INSERT INTO decoration (name) VALUES (?)`;
    connection.query(sql, [name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Decoração Adicionada!"
        });
    });
    connection;
};

function removeDecor(id, callback) {
    connection;
    const sql = `DELETE FROM decoration WHERE decoration_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Decoração Removida!"
        });
    });
    connection;
};

function addOutfit(img, name, callback) {
    connection;
    const sql = `INSERT INTO outfit (img, name) VALUES (?, ?)`;
    connection.query(sql, [img, name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Farda Adicionada!"
        });
    });
};

function removeOutfit(id, callback) {
    connection;
    const sql = `DELETE FROM outfit WHERE outfit_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Farda Removida!"
        });
    });
};

function addExtra(name, callback) {
    connection;
    const sql = `INSERT INTO extra (name) VALUES (?)`;
    connection.query(sql, [name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Extra Adicionado!"
        });
    });
};

function removeExtra(id, callback) {
    connection;
    const sql = `DELETE FROM extra WHERE extra_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Extra Removido!"
        })
    })
}

function getIngredients(callback) {
    connection;
    let sql = `SELECT * from ingredient`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
        
    })
    connection;
}

function getIngredientByMenu(id, callback) {
    connection;
    let sql = `select ingredient.ingredient_id, ingredient.name, ingredient.type from ingredient, menu, menu_Ingredient where menu.menu_id=?  AND menu.menu_id = menu_Ingredient.menu_id and ingredient.ingredient_id = menu_Ingredient.ingredient_id`;
    connection.query(sql,[id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            ingredients: rows
        })
        
    })
    connection;
}

function getDecors(callback) {
    connection;
    let sql = `SELECT * from decoration`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection;
}

function getOutfits(callback) {
    connection;
    let sql = `SELECT * from outfit`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection;
}

function getExtras(callback) {
    connection;
    let sql = `SELECT * from extra`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection;
}

module.exports = {
    addIngredient: addIngredient,
    removeIngredient: removeIngredient,
    addDecor: addDecor,
    removeDecor: removeDecor,
    addOutfit: addOutfit,
    removeOutfit: removeOutfit,
    getIngredients: getIngredients,
    getDecors: getDecors,
    getExtras: getExtras,
    getOutfits: getOutfits,
    addExtra: addExtra,
    removeExtra: removeExtra,
    getIngredientByMenu: getIngredientByMenu
}