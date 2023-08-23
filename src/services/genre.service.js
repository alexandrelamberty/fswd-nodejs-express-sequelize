const { GenreDTO } = require("../dto/genre.dto");
const db = require("../models");

const genreService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Genre.findAndCountAll({
      distinct: true,
      offset,
      limit,
    });

    return {
      genres: rows.map((genre) => new GenreDTO(genre)),
      count,
    };
  },

  getById: async (id) => {
    const genre = await db.Genre.findByPk(id);

    return genre ? new GenreDTO(genre) : null;
  },

  create: async (genreToAdd) => {
    const genre = await db.Genre.create(genreToAdd);
    return genre ? new GenreDTO(genre) : null;
  },

  update: async (id, genreToUpdate) => {
    const updatedRow = await db.Genre.update(genreToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Genre.destroy({
      where: { id },
    });

    return nbDeletedRow === 1;
  },
};

module.exports = genreService;
