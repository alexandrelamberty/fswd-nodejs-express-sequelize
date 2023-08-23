const router = require("express").Router();

const albumRouter = require("./album.routes");
const artistRouter = require("./artist.routes");
const authRouter = require("./auth.routes");
const genreRouter = require("./genre.routes");
const trackRouter = require("./track.routes");
const userRouter = require("./user.routes");

router.use("/auth", authRouter);
router.use("/user", userRouter);
//
router.use("/artist", artistRouter);
router.use("/album", albumRouter);
router.use("/track", trackRouter);
router.use("/genre", genreRouter);

module.exports = router;
