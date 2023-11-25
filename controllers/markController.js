const { Mark } = require("../models/models");
const ApiError = require("../error/ApiError");
const { where } = require("sequelize");

class MarkController {
  async create(req, res) {
    const { data, mark, studentId, disciplineId } = req.body;
    const oneMark = await Mark.create({ data, mark, studentId, disciplineId });
    return res.json(oneMark);
  }
  async getAll(req, res) {
    const { studentId, disciplineId } = req.body;
    let marks;
    if (!studentId && !disciplineId) {
      marks = await Mark.findAndCountAll();
    }
    if (studentId && !disciplineId) {
      marks = await Mark.findAndCountAll({ where: { studentId } });
    }
    if (!studentId && disciplineId) {
      marks = await Mark.findAndCountAll({ where: { disciplineId } });
    }
    if (studentId && disciplineId) {
      marks = await Mark.findAndCountAll({
        where: { studentId, disciplineId },
      });
    }
    return res.json(marks);
  }
  async getOneMark(req, res) {
    const { id } = req.params;
    const mark = await Mark.findOne({ where: { id } });
    return res.json(mark);
  }
  async deleteMark(req, res) {
    const { id } = req.params;
    const mark = await Mark.destroy({ where: { id } });
    return res.json(mark);
  }
}
module.exports = new MarkController();
