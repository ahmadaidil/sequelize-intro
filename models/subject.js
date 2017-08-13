'use strict';
module.exports = function(sequelize, DataTypes) {
  var subject = sequelize.define('subject', {
    subject_name: DataTypes.STRING
  });

  subject.associate = models=>{
    subject.hasMany(models.teacher, {foreignKey: 'subjectId'});
    subject.belongsToMany(models.student, {through: models.students_subject})
  }

  return subject;
};
