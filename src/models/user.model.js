const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.CHAR(60).BINARY, // for bcrypt
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    validated: {
      type: DataTypes.BOOLEAN,
    },
  });

  // https://sequelize.org/docs/v6/other-topics/hooks/
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSaltSync(11, "a");
    // const hashedPassword = await argon2.hash(user.password);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    console.log(hashedPassword);
    user.password = hashedPassword;
  });

  return User;
};
