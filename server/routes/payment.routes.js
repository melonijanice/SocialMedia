const paymantController = require('../controllers/payment.controllers')

//require authenticate from the base code


module.exports = (app)=>{
    app.get('/api/payment/health', paymantController.health),
    app.post('/api/payment', paymantController.payment)
}