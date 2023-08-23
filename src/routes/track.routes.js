var trackRouter = require("express").Router();
const trackController = require("../controllers/track.controller");
const pagination = require("../middlewares/pagination.middleware");

trackRouter
  .route("/")
  .get(pagination({ maxLimit: 100 }), trackController.getAll)
  .post(trackController.create);

trackRouter
  .route("/:trackId")
  .get(trackController.getById)
  .put(trackController.update)
  .delete(trackController.delete);

trackRouter.route("/:trackId/like").get(trackController.like);
trackRouter.route("/:trackId/unlike").get(trackController.unlike);

module.exports = trackRouter;
