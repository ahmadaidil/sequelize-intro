'use strict';
module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define('student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING
  });

  student.associate = models => {
    student.belongsToMany(models.subject, {through: models.students_subject})
  }

  return student;
};
