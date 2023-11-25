const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Student = sequelize.define("student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  snils: { type: DataTypes.INTEGER, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "STUDENT" },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  patronymic: { type: DataTypes.STRING },
});
const Mark = sequelize.define("mark", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data: { type: DataTypes.STRING, allowNull: false },
  mark: { type: DataTypes.INTEGER, allowNull: false },
});
const Discipline = sequelize.define("discipline", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});
const ClassRoom = sequelize.define("class", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

Student.hasMany(Mark);
Mark.belongsTo(Student);

ClassRoom.hasMany(Student);
Student.belongsTo(ClassRoom);

Discipline.hasMany(Mark);
Mark.belongsTo(Discipline);

module.exports = {
  Student,
  Mark,
  Discipline,
  ClassRoom,
};
