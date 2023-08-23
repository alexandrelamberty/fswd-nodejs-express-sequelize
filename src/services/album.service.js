const { AlbumDTO } = require("../dto/album.dto");
const db = require("../models");

const albumService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Album.findAndCountAll({
      distinct: true,
      offset,
      limit,
    });
    return {
      albums: rows.map((album) => new AlbumDTO(album)),
      count,
    };
  },

  getById: async (id) => {
    const album = await db.Album.findByPk(id);
    return album ? new AlbumDTO(album) : null;
  },

  create: async (albumToAdd) => {
    const album = await db.Album.create(albumToAdd);
    return album ? new AlbumDTO(album) : null;
  },

  update: async (id, albumToUpdate) => {
    const updatedRow = await db.Album.update(albumToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Album.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = albumService;
