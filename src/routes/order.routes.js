const controller = require('../controllers/order.controller')
const { verifyToken } = require('../middlewares/authJwt')

module.exports = function(app){
    app.use(verifyToken);
    app.get(
        '/api/user/orders', 
        controller.getUserOrders
    )

    app.get(
        '/api/user/order/:id',
        controller.getUserOrder
    )

    app.post(
        '/api/user/checkout',
        controller.createOrder
    )

    app.post(
        '/api/user/payment/:id', 
        controller.getPaymentDetails
    )

    app.post(
        '/api/user/request-cancel-order',
        controller.cancelTrip
    )
}