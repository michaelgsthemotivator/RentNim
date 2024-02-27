const { Rent } = require("../models");
const axios = require("axios");
const midtransClient = require("midtrans-client");

const generateToken = async (req, res, next) => {
  try {
    // console.log(req.userToFind.id, "adamas");
    const UserId = req.userToFind.id;

    const { animeId, duration, imageUrl, title } = req.body;
    console.log(req.body, "halloi");

    const allowedDurations = [7, 30, 90];
    if (!allowedDurations.includes(duration)) {
      throw { name: "InvalidDuration" };
    }
    const findRent = await Rent.findOne({
      where: { UserId, animeId, paid: true },
    });
    if (findRent) {
      throw { name: "AlreadyRented" };
    }

    const orderId = Math.floor(Math.random() * 10000000);
    // console.log(orderId, "masinis");

    const rentData = await Rent.create({
      UserId,
      animeId,
      duration,
      imageUrl,
      orderId,
      animeTitle: title,
    });

    console.log(rentData, "alohan");

    let price;
    if (duration === 7) price = 40000;
    else if (duration === 30) price = 100000;
    else if (duration === 90) price = 200000;

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: req.userToFind.email,
      },
    };

    const transactionToken = await snap.createTransaction(parameter);
    // console.log(transactionToken, "tokey");
    res.status(201).json({ transactionToken });
  } catch (err) {
    next(err);
  }
};

const successPayment = async (req, res, next) => {
  try {
    const { fraud_status, order_id } = req.body;
    console.log(req.body, "aku req body");
    if (fraud_status != "accept") throw { name: "FraudStatusFalse" };
    const findOrder = await Rent.findOne({ where: { orderId: order_id } });
    if (!findOrder) throw { name: "PaymentOrderNotFound" };
    await Rent.update(
      { paid: true, updatedAt: new Date() },
      { where: { id: findOrder.id } }
    );
    res.status(200).json({ message: "Payment verified" });
  } catch (err) {
    next(err);
  }
};

module.exports = { generateToken, successPayment };
