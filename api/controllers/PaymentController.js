var stripe = require('stripe')('sk_test_oPJOrwhkdFhK8pWfMRLXBaqv');

module.exports = {
  charge: function (req, res, next) {
    var source = req.source;
    var provider = req.provider_id;
    var amount = req.amount;

    Provider.findOne(provider, function(err, provider) {
      if (err) {
        res.status(400).json(err);
      } else {
        stripe_seller_id = provider.stripe_user_id;

        stripe.charges.create({
          amount: amount,
          currency: "usd",
          source: source, // obtained with Stripe.js
          destination: stripe_seller_id,
          application_fee: amount*0.1,
          description: "Charge for test@example.com"
          }, function(err, charge) {
            if (err) {
              res.status(400).json(err);
            } else {
              res.status(200).json(charge);
            }
          });             
      }
    });
  }

};
