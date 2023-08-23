const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Genre
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Genre = sequelize.define(
    "Genre",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "UK_Genre_Name",
      },
    },
    {
      tableName: "Genre",
      timestamps: false,
    }
  );

  return Genre;
};
