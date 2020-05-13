const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);

exports.addIngredient = (name, type, callback) => {
    connection.connect();
    const sql = `INSERT INTO Ingredient (name, type) VALUES(?, ?)`;
    connection.query(sql, [name, type], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingredient Added!",
        });
    });
    connection.end();
}

exports.removeIngredient = (id, callback) => {
    connection.connect();
    const sql = `DELETE FROM Ingredient WHERE ingredient_id = ?`;
    connection.query(sql, [id], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingredient Deleted!"
        });
    });
    connection.end();
}

exports.addDecor = (name, callback) => {
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

exports.removeDecor = (id, callback) => {
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

exports.addOutfit = (img, name, callback) => {
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

exports.removeOutfit = (id, callback) => {
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

exports.addExtra = (name, callback) => {
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

exports.removeExtra = (id, callback) => {
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

exports.getIngredients = (callback) => {
    connection.connect();
    let sql = `SELECT name from Ingredient`;
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

exports.getDecors = (callback) => {
    connection.connect();
    let sql = `SELECT name from decoration`;
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

exports.getOutfits = (callback) => {
    connection.connect();
    let sql = `SELECT name from outfit`;
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

exports.getExtras = (callback) => {
    connection.connect();
    let sql = `SELECT name from extra`;
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