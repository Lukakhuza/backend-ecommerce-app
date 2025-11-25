const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.addPaymentMethod = async (req, res, next) => {
  const { paymentMethodId } = req.body;

  try {
    // Attach card to customer:
    const attached = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: "cus_TUFLMZpBJmx1YG",
    });

    // Send card details (id, brand, last4)
    res.send({ id: attached.id, brand: attached.brand, last4: attached.last4 });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
