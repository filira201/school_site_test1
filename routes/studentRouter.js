const Router = require("express");
const router = new Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", studentController.login);
router.post("/registration", studentController.registration);
router.get("/auth", authMiddleware, studentController.check);
router.get("/:id", studentController.getOneStudent);
router.delete("/:id", studentController.deleteStundent);

module.exports = router;
