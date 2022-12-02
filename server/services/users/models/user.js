"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: { msg: "Username is already in use" },
				validate: {
					len: {
						args: [6],
						msg: "Username must be 6 characters or longer",
					},
					notEmpty: { msg: "Email cannot be empty" },
					notNull: { msg: "Email cannot be empty" },
				},
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: { msg: "Email is already in use" },
				validate: {
					isEmail: { msg: "Must be in email format" },
					notEmpty: { msg: "Email cannot be empty" },
					notNull: { msg: "Email cannot be empty" },
				},
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [6],
						msg: "Password must be 6 characters or longer",
					},
					notEmpty: { msg: "Password cannot be empty" },
					notNull: { msg: "Password cannot be empty" },
				},
			},
			phoneNumber: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: { msg: "Phone Number is already in use" },
				validate: {
					notEmpty: { msg: "Phone Number cannot be empty" },
					notNull: { msg: "Phone Number cannot be empty" },
				},
			},
			address: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: { msg: "Address cannot be empty" },
					notNull: { msg: "Address cannot be empty" },
				},
			},
      points: DataTypes.INTEGER
		},
		{
			hooks: {
				beforeCreate: (instance) => {
					instance.password = hashPassword(instance.password);
          instance.points = 0
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};