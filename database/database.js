const dbConfig = require("./db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const bcrypt = require('bcrypt');
var connection = mysql.createConnection(dbConfig);


//Table User
function tableUser(req, res) {
    connection.connect()
    console.log("Connected! Get!");
    var sql = "SELECT * from user";
    connection.query(sql, function (err, rows, fields) {
        if (!err) {
            let txt = "<h1>USER TABLE</h1>"
            txt += "<table border='1'>"
            txt += "<tr><td>ID</td><td>Name</td><td>Password</td></tr>";
            for (x = 0; x < rows.length; x++) {
                txt += "<tr><td>" + rows[x].id + "</td><td>" + rows[x].name + "</td><td>" + rows[x].email + "</td></tr>";
            }
            txt += "</table>";
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write("<html><body>");
            res.write(txt);
            res.write("</body></html>");
            res.end();

        } else
            console.log('Error while performing QUERY')
    });
    connection.end()
}

//Remove User
function deleteUser() {
    let idToDelete = 2
    connection.connect()
    console.log("Connected!");
    var sql = `DELETE FROM user WHERE user_id = ${idToDelete}`;
    connection.query(sql, function (err, result) {
        if (!err) {
            console.log('Deleted!')
        } else
            console.log('Error while performing QUERY')
        console.log(err)
    });
    connection.end()
}

//Register User
function insertUser(req,) {
    //Variaveis
    let name = connection.escape(req.body.name)
    let lastName =  connection.escape(req.body.lastName)
    let number = connection.escape(req.body.number)
    let img = connection.escape("")
    let school = connection.escape(req.body.school)
    let userType_id = 1
    let schoolID = 0

    if (school === "ESMAD") {
        schoolID = 0
    } else {
        schoolID = 1
    }
    if (req.body.password === req.body.password2) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            connection.connect();
            const sql =  `INSERT INTO user (name, lastName, email, password, number, img, userType_id, school_id) VALUES ("${name}","${lastName}","${email}","${hash}",${number},"${img}",${userType_id},${schoolID})`;
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results);
            });
            connection.end();
        })
    } else {
        console.log("Passwords nao coincidem!")
    }

}


module.exports = {
    insertUser: insertUser,
    tableUser: tableUser,
    deleteUser: deleteUser
}


// // Register
// router.post('/register', (req, res) => {
//     const {
//         name,
//         email,
//         password,
//         password2
//     } = req.body;
//     let errors = [];

//     if (!name || !email || !password || !password2) {
//         errors.push({
//             msg: 'Please enter all fields'
//         });
//     }

//     if (password != password2) {
//         errors.push({
//             msg: 'Passwords do not match'
//         });
//     }

//     if (password.length < 6) {
//         errors.push({
//             msg: 'Password must be at least 6 characters'
//         });
//     }

//     if (errors.length > 0) {
//         res.render('register', {
//             errors,
//             name,
//             email,
//             password,
//             password2
//         });
//     } else {
//         User.findOne({
//             email: email
//         }).then(user => {
//             if (user) {
//                 errors.push({
//                     msg: 'Email already exists'
//                 });
//                 res.render('register', {
//                     errors,
//                     name,
//                     email,
//                     password,
//                     password2
//                 });
//             } else {
//                 const newUser = new User({
//                     name,
//                     email,
//                     password
//                 });

//                 bcrypt.genSalt(10, (err, salt) => {
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         newUser.password = hash;
//                         newUser
//                             .save()
//                             .then(user => {
//                                 req.flash(
//                                     'success_msg',
//                                     'You are now registered and can log in'
//                                 );
//                                 res.redirect('/users/login');
//                             })
//                             .catch(err => console.log(err));
//                     });
//                 });
//             }
//         });
//     }
// });

// // Login
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect: '/dashboard',
//       failureRedirect: '/users/login',
//       failureFlash: true
//     })(req, res, next);
//   });
  
//   // Logout
//   router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
//   });
  