'use strict';
module.exports = function(sequelize, DataTypes) {
  var students_subject = sequelize.define('students_subject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });

  students_subject.associate = models => {
    students_subject.belongsTo(models.student)
    students_subject.belongsTo(models.subject)
  }

  return students_subject;
};
