const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.addPaymentMethod = async (req, res, next) => {
  const { paymentMethodId } = req.body;

  // Attach card to customer:
  const attached = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: "cus_TUFLMZpBJmx1YG",
  });

  console.log("Attached data: ", attached);
};
