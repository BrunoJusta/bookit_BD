const bookingFunctions = require("./bookingFunctions")

//Register User
function newBooking(req, result) {
    //Variaveis
    let reason = req.body.reason
    let date = req.body.date
    let school = req.body.school
    let initHour = req.body.initHour
    let endHour = req.body.endHour
    let time = initHour + "-" + endHour
    let numberPeople = req.body.numberPeople
    let img = ""
    let outfit = req.body.outfit
    let observations = req.body.observations
    let menu = req.body.menu
    let userID = req.body.userID
    let decor = req.body.decor
    let extras = req.body.extras
    let ing = req.body.ing


    bookingFunctions.addBooking(userID, menu, reason, date, time, numberPeople, school, outfit, observations, img, extras, decor,ing, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}




function approved(req, result){
    let id = req.params.id

    bookingFunctions.approveBooking(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}


function refuse(req, result){
    let id = req.params.id
    bookingFunctions.refuseBooking(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

function removeBooking(req, result){
    let id  = req.params.id
    bookingFunctions.removeBooking(id, (error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}




module.exports = {
    newBooking: newBooking,
    approved: approved,
    refuse: refuse,
    removeBooking: removeBooking
}


