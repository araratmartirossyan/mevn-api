const dollarsToCents = require('dollars-to-cents');
const { Order } = require('../model')
const { sum } = require('ramda')
const stripe = require('stripe')(
  'sk_test_51H0jsgJjMphy3gtYka8ebhPtKrWueI9YK3doRTKSShU2ACKGJsCbDZVcvnZrSHaxunwfUo2WnPsNBV0O0hCmldL100xbJGcaY0',
);

const createPaymentIntent = async ({ body: { fullname, address, phone, email, products } }, res) => {
  try {

    if (!address) {
      throw new Error('Адрес обязателен')
    }

    const amount = sum(products.map(i => Number(i.amount)))
    const prepareOrder = {
      fullname, address, phone, email, products, amount
    }

    const newOrder = await new Order(prepareOrder)
    const saveOrder = newOrder.save()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: 'eur',
      payment_method_types: ['card'],
    });

    return res.status(200).send({
      paymentIntent,
      saveOrder
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const stripeWebHook = async ({ body }, res) => {
  try {
    console.log(body)
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createPaymentIntent,
};
