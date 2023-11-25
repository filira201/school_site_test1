const Router = require("express");
const router = new Router();
const classRouter = require("./classRouter");
const disciplineRouter = require("./disciplineRouter");
const markRouter = require("./markRouter");
const studentRouter = require("./studentRouter");

router.use("/student", studentRouter);
router.use("/mark", markRouter);
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);

module.exports = router;
