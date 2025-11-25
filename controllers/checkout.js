const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/user");

exports.addPaymentMethod = async (req, res, next) => {
  const { paymentMethodId, userId } = req.body;

  try {
    // Attach card to customer:
    const attached = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: "cus_TUFLMZpBJmx1YG",
    });

    const newPaymentMethod = {
      id: attached.id,
      card: {
        brand: attached.card.brand,
        last4: attached.card.last4,
      },
    };

    // Update mongoDB database:
    const updatedStripePaymentMethod = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { stripePaymentMethod: newPaymentMethod } },
      { new: true }
    );

    // Send card details (id, brand, last4)
    res.send(updatedStripePaymentMethod);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
