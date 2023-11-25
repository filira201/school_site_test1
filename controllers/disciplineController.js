const { Discipline } = require("../models/models");
const ApiError = require("../error/ApiError");

class DisciplineController {
  async create(req, res) {
    const { name } = req.body;
    const discipline = await Discipline.create({ name });
    return res.json(discipline);
  }
  async getAll(req, res) {
    const disciplines = await Discipline.findAll();
    return res.json(disciplines);
  }
  async getOneDiscipline(req, res) {
    const { id } = req.params;
    const Onediscipline = await Discipline.findOne({ where: { id } });
    return res.json(Onediscipline);
  }
  async deleteDiscipline(req, res) {
    const { id } = req.params;
    const Onediscipline = await Discipline.destroy({ where: { id } });
    return res.json(Onediscipline);
  }
}
module.exports = new DisciplineController();
