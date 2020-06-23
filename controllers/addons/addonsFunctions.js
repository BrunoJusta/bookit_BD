// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});

function addIngredient(name, type, callback) {
    connection.connect();
    const sql = `INSERT INTO ingredient (name, type) VALUES(?, ?)`;
    connection.query(sql, [name, type], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingrediente Adicionado!",
        });
    });
    connection.end();
}

function removeIngredient(id, callback) {
    connection.connect();
    const sql = `DELETE FROM ingredient WHERE ingredient_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingrediente Removido!"
        });
    });
    connection.end();

}

function addDecor(name, callback) {
    connection.connect();
    const sql = `INSERT INTO decoration (name) VALUES (?)`;
    connection.query(sql, [name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Decoração Adicionada!"
        });
    });
    connection.end();

};

function removeDecor(id, callback) {
    connection.connect();
    const sql = `DELETE FROM decoration WHERE decoration_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Decoração Removida!"
        });
    });
    connection.end();

};

function addOutfit(img, name, callback) {
    connection.connect();
    const sql = `INSERT INTO outfit (img, name) VALUES (?, ?)`;
    connection.query(sql, [img, name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Farda Adicionada!"
        });
    });
    connection.end();
};

function removeOutfit(id, callback) {
    connection.connect();
    const sql = `DELETE FROM outfit WHERE outfit_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Farda Removida!"
        });
    });
    connection.end();
};

function addExtra(name, callback) {
    connection.connect();
    const sql = `INSERT INTO extra (name) VALUES (?)`;
    connection.query(sql, [name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Extra Adicionado!"
        });
    });
    connection.end();
};

function removeExtra(id, callback) {
    connection.connect();
    const sql = `DELETE FROM extra WHERE extra_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Extra Removido!"
        })
    })
    connection.end();
}

function getIngredients(callback) {
    connection.connect();
    let sql = `SELECT * from ingredient`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
        
    })
    connection.end();
}

function getIngredientByMenu(id, callback) {
    connection.connect();
    let sql = `select ingredient.ingredient_id, ingredient.name, ingredient.type from ingredient, menu, menu_Ingredient where menu.menu_id=?  AND menu.menu_id = menu_Ingredient.menu_id and ingredient.ingredient_id = menu_Ingredient.ingredient_id`;
    connection.query(sql,[id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            ingredients: rows
        })
        
    })
    connection.end();
}

function getDecors(callback) {
    connection.connect();
    let sql = `SELECT * from decoration`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection.end();
}

function getSchools(callback) {
    connection.connect();
    let sql = `SELECT * from school`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection.end();
}


function getOutfits(callback) {
    connection.connect();
    let sql = `SELECT * from outfit`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection.end();  
}

function getExtras(callback) {
    connection.connect();
    let sql = `SELECT * from extra`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data: rows
        })
    })
    connection.end();
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
    getSchools: getSchools,
    addExtra: addExtra,
    removeExtra: removeExtra,
    getIngredientByMenu: getIngredientByMenu
}