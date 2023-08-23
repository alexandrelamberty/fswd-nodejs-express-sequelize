const { Request, Response } = require("express");
const genreService = require("../services/genre.service");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const genreController = {
  /**
   * Get All
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { genres, count } = await genreService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(genres, count));
  },

  /**
   * Get By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const genre = await genreService.getById(id);
    if (!genre) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(genre));
  },

  /**
   * Create
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const genre = await genreService.create(data);
    res.location("/genre/" + genre.id);
    res.status(201).json(new SuccessResponse(genre, 201));
  },

  /**
   * Update
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const isUpdated = await genreService.update(id, data);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const isDeleted = await genreService.delete(id);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = genreController;
