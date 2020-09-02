const dollarsToCents = require('dollars-to-cents');

const stripe = require('stripe')(
  'sk_test_51H0jsgJjMphy3gtYka8ebhPtKrWueI9YK3doRTKSShU2ACKGJsCbDZVcvnZrSHaxunwfUo2WnPsNBV0O0hCmldL100xbJGcaY0',
);

const createPaymentIntent = async ({ body: { amount } }, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: 'eur',
      payment_method_types: ['card'],
    });

    return res.status(200).send(paymentIntent);
  } catch (err) {
    res.status(500).send(err);
  }
};

const stripeWebHook = async ({ body }, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  createPaymentIntent,
};
