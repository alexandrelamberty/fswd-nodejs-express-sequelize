const { TrackDTO } = require("../dto/track.dto");
const db = require("../models");

const trackService = {
  /**
   * Get All
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<{tracks: Track[], count: number}>}
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Track.findAndCountAll({
      distinct: true,
      offset,
      limit,
      // rajouter genre, albums, artists
    });

    return {
      tracks: rows.map((track) => new TrackDTO(track)),
      count,
    };
  },

  /**
   * Get By Id
   * @param {number} id
   * @returns {Promise<Track>}
   */
  getById: async (id) => {
    const track = await db.Track.findByPk(id, {
      // rajouter genre, albums, artists
    });

    return track ? new TrackDTO(track) : null;
  },

  create: async (trackToAdd) => {
    // Create transaction
    const track = await db.Track.create(trackToAdd);
    // Add artists, albums
    return track ? new TrackDTO(track) : null;
  },

  update: async (id, trackToUpdate) => {
    const updatedRow = await db.Track.update(trackToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Track.destroy({
      where: { id },
    });

    return nbDeletedRow === 1;
  },

  addLikedTrack: async (userId, trackId) => {
    const currentUser = await db.User.findByPk(userId);
    const trackToAdd = await db.Track.findByPk(trackId);
    await currentUser.addTrack(trackToAdd);
    await currentUser.save();
    return trackToAdd ? new TrackDTO(trackToAdd) : null;
  },

  removeLikedTrack: async (userId, trackId) => {
    const currentUser = await db.User.findByPk(userId);
    const trackToRemove = await db.Track.findByPk(trackId);
    await currentUser.removeTrack(trackToRemove);
    await currentUser.save();
  },
};

module.exports = trackService;
