const { Request, Response } = require("express");
const userService = require("../services/user.service");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const userController = {
  /**
   * Register a new user
   * @param {Request} req
   * @param {Response} res
   */
  register: async (req, res) => {
    const data = req.body;
    const user = await userService.create(data);
    res.location("/user/" + user.id);
    res.status(201).json(new SuccessResponse(user, 201));
  },

  /**
   * Login a user
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const isUpdated = await userService.update(id, data);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Logout a user
   * @param {Request} req
   * @param {Response} res
   */
  logout: async (req, res) => {
    const { id } = req.params;
    const isDeleted = await userService.delete(id);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = userController;
