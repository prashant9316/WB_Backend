const controller = require('../controllers/event.controller')
const { verifyToken, isAdmin } = require('../middlewares/authJwt')

module.exports = function(app){
    app.use(isAdmin)
    app.get(
        '/api/admin/all-event',
        controller.getAllEvents
    )
    app.post(
        '/api/admin/create-event',
        controller.newEvent
    )
    app.post(
        '/api/admin/update-event/:event',
        controller.updateEvent
    )
    app.post(
        '/api/admin/activate-event/:event',
        controller.activateEvent
    )
    app.post(
        '/api/admin/deactivate-event/:event',
        controller.deactivateEvent
    )

    app.get(
        '/api/admin/all-coupons/:event',
        controller.getAllCoupons
    )

    app.post(
        '/api/admin/add-coupon/:event', 
        controller.addCoupon
    )

    app.post(
        '/api/admin/activate-coupon/:event/:coupon_name', 
        controller.activateCoupon
    )

    app.post(
        '/api/admin/deactivate-coupon/:event/:coupon_name',
        controller.deactivateCoupon
    )

}