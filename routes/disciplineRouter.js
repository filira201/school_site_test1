const Router = require("express");
const router = new Router();
const disciplineController = require("../controllers/disciplineController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), disciplineController.create);
router.get("/", disciplineController.getAll);
router.get("/:id", disciplineController.getOneDiscipline);
router.delete("/:id", disciplineController.deleteDiscipline);

module.exports = router;
