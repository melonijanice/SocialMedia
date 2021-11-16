const stripe = require('stripe')(process.env.STRIPE_SK)



const paymantController = {

    health: (req, res)=>{
        res.json({message:"payment api backend is connected"})
    },

    payment: async (req, res) =>{
        const {product, token} = req.body
        console.log("product, token for payment :",product, token)
    
        return stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then( customer =>{
            stripe.charges.create(
                {
                    amount: product.price*100,
                    currency: "usd",
                    customer:customer.id, 
                    receipt_email:token.email,
                    description: product.name,
                    shipping:{
                        name:token.card.name,
                        address:{
                            country: token.card.address_country
                        }
                    }
                }
            )
        })
        .then( response => res.status(200).json(response))
        .catch( error => console.log(error))
    
    }
}

module.exports = paymantController