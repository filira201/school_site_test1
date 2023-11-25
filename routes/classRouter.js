const Router = require("express");
const router = new Router();
const classController = require("../controllers/classController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), classController.create);
router.get("/", classController.getAll);
router.get("/:id", classController.getOneClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
