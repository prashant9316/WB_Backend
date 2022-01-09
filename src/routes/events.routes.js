const controller = require('../controllers/event.controller');

module.exports = function(app){
    app.get(
        '/api/all-event',
        controller.getAllEvents
    )

    app.get(
        '/api/event/:slug', 
        controller.getEvent
    )

    // app.geT(
    //     '/api/event/:slug', 
    //     controller.getEvent
    // )
}