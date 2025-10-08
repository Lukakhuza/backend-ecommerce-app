const Product = require("../models/product");
const User = require("../models/user");
// const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createProduct = (req, res, next) => {
  const title = "Title 5";
  const price = 35.99;
  const description = "This is the description";
  const imageUrl = "image URL 15";
  const category = "Men's Clothing";
  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    category: category,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = "682592a9540cff409b8f9397";
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const updatedTitle = "Title 1 Updated";
  const updatedPrice = 26.0;
  const updatedDescription = "This is some description Updated";
  const updatedImageUrl = "image URL 1 Updated";
  const updatedCategory = "Men's Updated";

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      product.category = updatedCategory;
      return product.save();
    })
    .then((result) => {
      console.log("Product Updated");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      console.log("Product Deleted");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  // const product = req.body.productData;
  const product = {
    id: req.body.productData.id,
    title: req.body.productData.title,
    price: req.body.productData.price,
  };
  const user = req.body.userData;
  const updatedFirstName = user.firstName;
  const updatedLastName = user.lastName;
  const updatedEmail = user.email;
  const updatedPhoneNumber = user.phoneNumber;
  const updatedAddress = user.address;
  const updatedCartItem = {
    product: product,
    quantity: req.body.productData.quantity,
  };
  const updatedShopFor = user.shopFor;

  User.findOne({ email: user.email })
    .then((user) => {
      user.firstName = updatedFirstName;
      user.lastName = updatedLastName;
      user.email = updatedEmail;
      user.phoneNumber = updatedPhoneNumber;
      user.address = updatedAddress;
      user.shopFor = updatedShopFor;
      let productIndexInCart = -1;

      // Check if the product is already in the cart. If so, update quantity.
      for (i = 0; i < user.cart.items.length; i++) {
        if (product.id === user.cart.items[i].product.id) {
          productIndexInCart = i;
          console.log(productIndexInCart);
        }
      }

      // If the product is not already in the cart, add it to the cart
      if (productIndexInCart === -1) {
        user.cart.items.push(updatedCartItem);
      } else {
        // if it is already in the cart, update the quantity.
        user.cart.items[productIndexInCart].quantity +=
          updatedCartItem.quantity;
      }
      return user.save();
    })
    .then((result) => {
      console.log("Test 42", result);

      const result1 = JSON.stringify({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        password: result.password,
        phoneNumber: result.phoneNumber,
        address: result.address,
        shopFor: result.shopFor,
        cart: result.cart,
      });

      const userData = JSON.parse(result1);
      console.log("Test 51", userData);
      res.status(200).json({ user: userData });
      console.log("Updated User!");
      return result1;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteFromCart = (req, res, next) => {
  const product = {
    id: req.body.productData.id,
    title: req.body.productData.title,
    price: req.body.productData.price,
  };
  const user = req.body.userData;
  const updatedFirstName = user.firstName;
  const updatedLastName = user.lastName;
  const updatedEmail = user.email;
  const updatedPhoneNumber = user.phoneNumber;
  const updatedAddress = user.address;
  const updatedShopFor = user.shopFor;
  const updatedCartItem = {
    product: product,
    quantity: req.body.productData.quantity,
  };

  User.findOne({ email: user.email })
    .then((user) => {
      user.firstName = updatedFirstName;
      user.lastName = updatedLastName;
      user.email = updatedEmail;
      user.phoneNumber = updatedPhoneNumber;
      user.address = updatedAddress;
      user.shopFor = updatedShopFor;
      let productIndexInCart;
      // Check if product quantity is greater than one:
      // Get product index in cart
      for (let i = 0; i < user.cart.items.length; i++) {
        if (product.id === user.cart.items[i].product.id) {
          productIndexInCart = i;
        }
      }

      // If the quantity is greater than one, decrease it:
      if (user.cart.items[productIndexInCart].quantity > 1) {
        user.cart.items[productIndexInCart].quantity -= 1;
      } else {
        // else remove the item.
        user.cart.items = user.cart.items.filter((cartItem) => {
          if (user.cart.items[productIndexInCart].id === cartItem.product.id) {
            return true;
          } else {
            return false;
          }
        });
      }
      return user.save();
    })
    .then((result) => {
      console.log("Updated User!");
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addToFavorites = (req, res, next) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  User.findById(userId).then((user) => {
    if (user.favorites.items.includes(productId)) {
      console.log("Includes");
    } else {
      user.favorites.items.push(Number(productId));
    }

    return user.save();
  });
};

// exports.testStripe = (req, res, next) => {
//   console.log("Testing stripe");
//   stripe.checkout.sessions
//     .create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Fancy T-Shirt",
//             },
//             unit_amount: 1565,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: req.protocol + "://" + req.get("host") + "/checkout/success", // => http://localhost:3000
//       cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
//     })
//     .then((session) => {
//       const data = {
//         session: session,
//       };

//       console.log("Test 102", session);
//       res.status(200).json({ data: data });
//       // stripe.redirectToCheckout({
//       // sessionId: session.id,
//       // });
//     });
// };

// run this whenever the place order button is clicked.
// exports.goToCheckout = (req, res, next) => {
//   stripe.redirectToCheckout({
//     sessionId: "",
//   });
// };

// exports.createPaymentIntent = (req, res, next) => {
//   console.log("Test 100.05");
//   stripe.paymentIntents
//     .create({ amount: 1099, currency: "usd" })
//     .then((intent) => {
//       console.log("Test 101", intent);
//     });
// };

// exports.paymentSheetFunction = async (req, res, next) => {
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     { customer: customer.id },
//     { apiVersion: "2025-05-28.basil" }
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: "eur",
//     customer: customer.id,
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter
//     // is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//   });
// };
