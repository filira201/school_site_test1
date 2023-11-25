const { ClassRoom } = require("../models/models");
const ApiError = require("../error/ApiError");

class ClassController {
  async create(req, res) {
    const { name } = req.body;
    const classRoom = await ClassRoom.create({ name });
    return res.json(classRoom);
  }
  async getAll(req, res) {
    const classRooms = await ClassRoom.findAll();
    return res.json(classRooms);
  }
  async getOneClass(req, res) {
    const { id } = req.params;
    const oneClass = await ClassRoom.findOne({ where: { id } });
    return res.json(oneClass);
  }
  async deleteClass(req, res) {
    const { id } = req.params;
    const oneClass = await ClassRoom.destroy({ where: { id } });
    return res.json(oneClass);
  }
}
module.exports = new ClassController();
