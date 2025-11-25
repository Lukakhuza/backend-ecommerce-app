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
        brand: attached.brand,
        last4: attached.last4,
      },
    };

    // Update mongoDB database:
    const response = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { stripePaymentMethod: newPaymentMethod } },
      { new: true }
    );

    console.log("Response Here: ", response);

    // Send card details (id, brand, last4)
    // res.send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
