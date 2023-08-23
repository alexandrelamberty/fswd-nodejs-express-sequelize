var genreRouter = require("express").Router();
const genreController = require("../controllers/genre.controller");
const pagination = require("../middlewares/pagination.middleware");

genreRouter
  .route("/")
  .get(pagination({ maxLimit: 100 }), genreController.getAll)
  .post(genreController.create);

genreRouter
  .route("/:id")
  .get(genreController.getById)
  .put(genreController.update)
  .delete(genreController.delete);

module.exports = genreRouter;
