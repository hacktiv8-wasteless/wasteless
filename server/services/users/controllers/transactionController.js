const { db } = require("../../app/models/post");
const { Transaction, User, History, sequelize } = require("../models");

class Controller {
  static async create(req, res, next) {
    let { id: payerId } = req.user;
    let { payeeId, totalPrice } = req.body;
    let status = `Success`;
    try {
      const result = await sequelize.transaction(async (t) => {
        const commission = 0.1 * totalPrice;
        const transaction = await Transaction.create(
          { payerId, payeeId, totalPrice, commission },
          { transaction: t }
        );

        const payingUser = await User.update(
          {
            balance: sequelize.literal(`balance - ${totalPrice - commission}`),
            points: sequelize.literal(`points + ${commission}`),
          },
          {
            where: { id: payerId },
            transaction: t,
            returning: true,
            plain: true,
          }
        );

        console.log(payingUser);

        await User.update(
          {
            balance: sequelize.literal(`balance + ${totalPrice - commission}`),
            points: sequelize.literal(`points + ${commission}`),
          },
          { where: { id: payeeId }, transaction: t }
        );

        return transaction;
      });

      res.status(200).json({ result });
    } catch (error) {
      status = "Failed";
      next(error);
    } finally {
      await History.create({ payerId, payeeId, amount: totalPrice, status });
    }
  }
  static async get(req, res, next) {
    const { id } = req.params;
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
