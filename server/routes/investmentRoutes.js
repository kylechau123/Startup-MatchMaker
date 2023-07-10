const express = require('express');
const router = express.Router();
const { Investment } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/new', async (req, res) => {
  // Here you would probably collect payment info from req.body, 
  // then use it to create a new charge with Stripe.

  const charge = await stripe.charges.create({
    amount: /* Amount to charge */,
    currency: 'usd',
    source: /* Token from Stripe Checkout */,
    description: /* Description of charge */,
  });

  // Create new Investment document with charge data
  const newInvestment = new Investment({
    investor: /* investor's ObjectId */,
    startup: /* startup's ObjectId */,
    stripeChargeId: charge.id,
    status: charge.status,
    amount: charge.amount,
    currency: charge.currency,
    description: charge.description,
  });
  newInvestment.save();

  res.status(200).send('Investment created successfully!');
});

module.exports = router;
