const { Request, Response } = require("express");
const trackService = require("../services/track.service");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");
const userService = require("../services/user.service");
const db = require("../models");

const trackController = {
  /**
   * Get All
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { tracks, count } = await trackService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(tracks, count));
  },

  /**
   * Get By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { trackId } = req.params;
    const track = await trackService.getById(trackId);
    if (!track) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(track));
  },

  /**
   * Create
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const track = await trackService.create(data);
    res.location("/track/" + track.id);
    res.status(201).json(new SuccessResponse(track, 201));
  },

  /**
   * Update
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { trackId } = req.params;
    const data = req.body;
    const isUpdated = await trackService.update(trackId, data);
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
    const { trackId } = req.params;
    const isDeleted = await trackService.delete(trackId);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Like a track
   * @param {Request} req
   * @param {Response} res
   */
  like: async (req, res) => {
    const { trackId } = req.params;
    // const currentUser = req.user;
    const currentUser = await userService.getById(1);
    const trackToAdd = await trackService.addLikedTrack(
      currentUser.id,
      trackId
    );
    res.location("/track/" + trackToAdd.id);
    res.status(201).json(new SuccessResponse(trackToAdd, 201));
  },

  /**
   * Unlike a track
   * @param {Request} req
   * @param {Response} res
   */
  unlike: async (req, res) => {
    const { trackId } = req.params;
    // const currentUser = req.user;
    const currentUser = await userService.getById(1);
    await trackService.removeLikedTrack(currentUser.id, trackId);
    // NoContent response to indicate successful operation ?
    res.sendStatus(204);
  },
};

module.exports = trackController;
