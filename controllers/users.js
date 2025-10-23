const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: Stripe } = require("stripe");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createUser = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const shopFor = req.body.shopFor;
  const stripeCustomerId = req.body.stripeCustomerId;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        address: address,
        shopFor: shopFor,
        stripeCustomerId: stripeCustomerId,
      });

      return user.save();
    })
    .then((result) => {
      res.status(200).json({ userData: result });
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createCustomerInStripe = async (req, res, next) => {
  const { email, firstName, lastName, phoneNumber, description, address, _id } =
    req.body.userData;

  const customerData = {
    email: email,
    metaData: {
      userId: _id, // UserId in MongoDB
    },
  };

  if (firstName || lastName) {
    customerData.name = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  }

  if (phoneNumber) {
    customerData.phone = phoneNumber;
  }

  if (description) {
    customerData.description = description;
  }

  if (address) {
    customerData.address = {
      line1: address.addressLine1,
      city: address.city,
      state: address.state,
      postal_code: address.zipcode,
      country: "US",
    };
  }

  try {
    const customer = await stripe.customers.create(customerData);

    res.json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("There is no user with the provided email!");
      error.statusCode = 401;
      throw error;
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      const error = new Error("Incorrect Password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "testsec",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (err) {
    console.log(err);
    if (err.statusCode === 401) {
      return res.status(401).json({
        message: "Authentication Failed.",
        errors: err.errors,
      });
    }
  }
};

exports.authenticate = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return null;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "testsec");
  } catch (error) {
    console.log("Err 1", error);
    error.statusCode = 500;
    res.status(500).json({ message: "Status 500 Error." });
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated.");
    console.log("Err 2", error);
    error.statusCode = 401;
    res.status(401).json({ message: "Token is invalid." });
    throw error;
  }
  res.status(200).json({ token: token, decodedToken: decodedToken });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  // const userId = "6825a5af70841ecb0896f31d";
  // const user =
  // User.findOne({ email:  })
  //   .then((user) => {
  //     console.log("This is the user: ", user);
  //   })
  //   // const userId = req.params.userId;
  //   // User.findById(userId)
  //   //   .then((user) => {
  //   //     console.log(user);
  //   //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getUserByEmail = (req, res, next) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }).then((user) => {
    const result = JSON.stringify({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: user.address,
      shopFor: user.shopFor,
      favorites: user.favorites,
      cart: user.cart,
      stripeCustomerId: user.stripeCustomerId,
    });

    const userData = JSON.parse(result);
    res.status(200).json({ user: userData });
  });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedFirstName = req.body.firstName;
  const updatedLastName = req.body.lastName;
  const updatedEmail = req.body.email;
  const updatedPhoneNumber = req.body.phoneNumber;
  const updatedAddress = req.body.address;
  const updatedShopFor = "Men";
  const stripeCustomerId = req.body.stripeCustomerId;

  console.log("Stripe Customer Id: ", stripeCustomerId);
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.firstName = updatedFirstName;
      user.lastName = updatedLastName;
      user.email = updatedEmail;
      user.phoneNumber = updatedPhoneNumber;
      user.address = updatedAddress;
      user.shopFor = updatedShopFor;
      user.stripeCustomerId = stripeCustomerId;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ userData: result });
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete(userId)
    .then((result) => {
      console.log("Deleted User!");
    })
    .catch((err) => {
      console.log(err);
    });
};
