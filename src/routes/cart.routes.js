const controller = require('../controllers/cart.controller')
const { verifyToken } = require('../middlewares/authJwt')

module.exports = function(app){
    app.use(verifyToken)
    app.get(
        '/api/user/cart', 
        controller.getUserCart
    )

    app.post(
        '/api/user/add-to-cart',
        controller.addToCart
    )

    app.post(
        '/api/user/remove-from-cart',
        controller.removeFromCart
    )

    app.post(
        '/api/user/empty-cart',
        controller.emptyCart
    )

    app.post(
        '/api/user/update-cart', 
        controller.updateCart
    )
}