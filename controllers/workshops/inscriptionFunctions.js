// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});

function addInscription(idUser, idWorkshop, callback) {
    connection
    const sql = `SELECT filled from workshop WHERE workshop_id = ?`;
    connection.query(sql, [idWorkshop], function (error, rows, fields) {
        console.log(error)
        if (!error) {
            console.log(rows)
            let newFilled = rows[0].filled + 1
            const sql2 = `UPDATE workshop SET filled = ? where workshop_id = ?`
            connection.query(sql2, [newFilled, idWorkshop], function (error, results, fields) {
                if (!error) {
                    const sql2 = `INSERT INTO inscription (workshop_id, user_id) VALUES(?,?)`
                    connection.query(sql2, [idWorkshop, idUser], function (error, results, fields) {
                        if (error) callback(error);
                        callback(null, {
                            success: true,
                            message: "Inscrito no Workshop!"
                        })
                    });
                }
            });
        }
    });
    connection
}

function getInscription(callback){
    connection
    const sql = `SELECT * from inscription`;
    connection.query(sql, function(error, rows, fields){
        if (error) callback(error);
        callback(null, {
            success: true,
            data: rows[0]
        })
    })
    connection
}

module.exports = {
    addInscription: addInscription,
    getInscription: getInscription
}