const express = require('express');
const router = express.Router();
const model = require('../models');
const letterScore = require('../helpers/letterScore');
const session = require('express-session');

router.get('/', (req, res)=>{
  model.subject.findAll({order: [['id', 'ASC']]})
    .then(subjects=>{
      //res.render('subjects', {data:subjects});
      let promises = subjects.map(subject=>{
        //console.log(subject);
        return new Promise((resolve, reject)=>{
          subject.getTeachers()
           .then(teachers=>{
             subject['teachers'] = teachers;
             resolve(subject);
           })
           .catch(err=>{
             reject(err);
           })
        })
      })
      Promise.all(promises)
        .then(subjects=>{
          res.render('subjects', {data:subjects, title:'All Subjects Data', user:req.session.user});
        })
        .catch(err=>{
          res.send(err.toString());
        })
    })
    .catch(err=>{
      res.send(err.toString());
    })
})

router.get('/add', (req, res)=>{
  res.render('add-subject', {title:'Add New Subject', user:req.session.user});
});

router.post('/add', (req, res)=>{
  model.subject.create({
    subject_name: req.body.subject_name
  })
    .then(()=>{
      res.redirect('/subjects');
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.get('/edit/:id', (req, res)=>{
  model.subject.findById(req.params.id)
    .then(subject=>{
      res.render('edit-subject', {subject:subject, title:`Edit Subject ${subject.subject_name}`, user:req.session.user});
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.post('/edit/:id', (req, res)=>{
  model.subject.update({
    subject_name: req.body.subject_name
  },{
    where:{id:req.params.id}
  }).then(()=>{
    res.redirect('/subjects');
  }).catch(err=>{
    res.send(err.toString());
  })
});

router.get('/delete/:id', (req, res)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster'){
    model.subject.destroy({
      where:{id:req.params.id}
    }).then(task=>{
      res.redirect('/subjects')
    }).catch(err=>{
      res.send(err.toString());
    });
  }else{
    res.redirect('/subjects');
  }
})

router.get('/:id/enrolledstudents', (req, res)=>{
  model.subject.findById(req.params.id)
    .then(subject=>{
      subject.getStudents({order: [['first_name', 'ASC']]})
        .then(students=>{
          students.forEach(s=>{
            s['letterScore'] = letterScore(s.students_subject.score);
          })
          res.render('enroll-students', {subject:subject, students:students, title:`${subject.subject_name}`, user:req.session.user});
        })
        .catch(err=>{
          res.send(err.toString());
        })
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.get('/:subjectId/givescore/:studentId', (req, res) => {
  model.student.findById(req.params.studentId)
  .then(student=>{
    res.render('givescore', {student: student, title:`Score for ${student.full_name}`, subjectId: req.params.subjectId, user:req.session.user})
  })
  .catch(err=>{
    res.send(err.toString());
  })
})

router.post('/:subjectId/givescore/:studentId', (req, res) => {
  model.students_subject.update({score:req.body.score},{where: {subjectId: req.params.subjectId, studentId: req.params.studentId}})
  .then(()=>{
    res.redirect(`/subjects/${req.params.subjectId}/enrolledstudents`)
  })
  .catch(err=>{
    res.send(err.toString());
  })
})

module.exports = router;
