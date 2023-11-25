const { Student } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, snils, role) => {
  return jwt.sign({ id, snils, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class StudentController {
  async registration(req, res, next) {
    const { snils, password, role, name, surname, patronymic, classId } =
      req.body;
    if (!snils || !password)
      return next(ApiError.badRequest("Некоректный СНИЛС ил пароль"));
    const candidate = await Student.findOne({ where: { snils } });
    if (candidate)
      return next(
        ApiError.badRequest("Пользователь с таким СНИЛС уже существует")
      );
    const hashPassword = await bcrypt.hash(password, 5);
    const student = await Student.create({
      snils,
      role,
      name,
      surname,
      patronymic,
      password: hashPassword,
      classId,
    });
    const token = generateJwt(student.id, student.snils, student.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { snils, password } = req.body;
    const student = await Student.findOne({ where: { snils } });
    if (!student) return next(ApiError.internal("Пользователь не найден"));
    let comparePassword = bcrypt.compareSync(password, student.password);
    if (!comparePassword)
      return next(ApiError.internal("Указан неверный пароль"));
    const token = generateJwt(student.id, student.snils, student.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(
      req.student.id,
      req.student.snils,
      req.student.role
    );
    return res.json({ token });
  }
  async getOneStudent(req, res) {
    const { id } = req.params;
    const oneStudent = await Student.findOne({ where: { id } });
    return res.json(oneStudent);
  }
  async deleteStundent(req, res) {
    const { id } = req.params;
    const oneStudent = await Student.destroy({ where: { id } });
    return res.json(oneStudent);
  }
}
module.exports = new StudentController();
