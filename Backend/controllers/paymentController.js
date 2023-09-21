const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: {
            company: 'ashishadarsh',
        },
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
}

exports.sendStripApi = async (req, res) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
}