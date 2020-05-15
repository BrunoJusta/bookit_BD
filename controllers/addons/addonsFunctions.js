const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);

function addIngredient(name, type, callback) {
    connection.connect();
    const sql = `INSERT INTO ingredient (name, type) VALUES(?, ?)`;
    connection.query(sql, [name, type], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingredient Added!",
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
            message: "Ingredient Deleted!"
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
            message: "Decoration Added!"
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
            message: "Decoration Deleted!"
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
            message: "Outfit Added!"
        });
    });
};

function removeOutfit(id, callback) {
    connection.connect();
    const sql = `DELETE FROM outfit WHERE outfit_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Outfit Deleted!"
        });
    });
};

function addExtra(name, callback) {
    connection.connect();
    const sql = `INSERT INTO extra (name) VALUES (?)`;
    connection.query(sql, [name], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Extra Added!"
        });
    });
};

function removeExtra(id, callback) {
    connection.connect();
    const sql = `DELETE FROM extra WHERE extra_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Extra Deleted!"
        })
    })
}

function getIngredients(callback) {
    connection.connect();
    let sql = `SELECT * from ingredient`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            message: "Ingredients Table!"
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
            message: "Decors Table!"
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
            message: "Outfits Table!"
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
            message: "Extras Table!"
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
    getOutfits: getOutfits
}