const { UserDTO } = require("../dto/user.dto");
const db = require("../models");
const argon2 = require("argon2");

const userService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.User.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: "Tracks",
    });
    console.log("ROWS", rows);
    return {
      users: rows.map((user) => new UserDTO(user)),
      count,
    };
  },

  getById: async (id) => {
    const user = await db.User.findByPk(id);
    return user ? new UserDTO(user) : null;
  },

  create: async (userToAdd) => {
    const user = await db.User.create(userToAdd);
    return user ? new UserDTO(user) : null;
  },

  update: async (id, userToUpdate) => {
    const updatedRow = await db.User.update(userToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.User.destroy({
      where: { id },
    });

    return nbDeletedRow === 1;
  },
};

module.exports = userService;
