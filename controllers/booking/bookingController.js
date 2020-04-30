const bookingFunctions = require("./bookingFunctions")

//Register User
function Newbooking(req, result) {
    //Variaveis
    let reason = req.body.reason
    let date = req.body.date
    let school = req.body.school
    let initHour = req.body.initHour
    let endHour = req.body.endHour
    let time = initHour + "-" + endHour
    let numberPeople = req.body.numberPeople
    // let drinks = req.body.drinks
    // let foods = req.body.foods
    // let extras = req.body.extras
    // let decor = req.body.decor
    let img = ""
    let outfit = req.body.outfit
    let observations = req.body.observations
    let menu = req.body.menu
    let userID = req.body.userID
    let decor = req.body.decor
    let extras = req.body.extras


    bookingFunctions.addBooking(userID, menu, reason, date, time, numberPeople, school, outfit, observations, img, extras, decor, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}




module.exports = {
    Newbooking: Newbooking,
}


