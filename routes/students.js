const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  model.student.findAll({order: [['first_name', 'ASC']]})
    .then(students=>{
      res.render('students', {data:students});
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.get('/add', (req, res)=>{
  res.render('add-student', {err:false});
});

router.post('/add', (req, res)=>{
  model.student.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    full_name:req.body.first_name+' '+req.body.last_name,
    email:req.body.email
  }).then(task=>{
    res.redirect('/students');
  }).catch(err=>{
    res.render('add-student', {err:err, errmsg:'Email is already used'});
  })
});

router.get('/edit/:id', (req, res)=>{
  model.student.findById(req.params.id)
    .then(student=>{
      res.render('edit-student', {dS:student});
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.post('/edit/:id', (req, res)=>{
  model.student.update({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
  },{
    where:{id:req.params.id}
  }).then(task=>{
    res.redirect('/students');
  }).catch(err=>{
    res.send(err.toString());
  })
});

router.get('/delete/:id', (req, res)=>{
  model.Student.destroy({
    where:{id:req.params.id}
  }).then(task=>{
    res.redirect('/students')
  }).catch(err=>{
    res.send(err.toString());
  });
});

router.get('/:id/addsubject', (req, res)=>{
  model.student.findById(req.params.id)
    .then(student=>{
      model.subject.findAll()
        .then(subjects=>{
          res.render('add-studentSubject', {dataStudent:student, dataSS:subjects});
        })
        .catch(err=>{
          res.send(err.toString());
        });
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/:id/addsubject', (req, res)=>{
  model.students_subject.create({
    studentId : parseInt(req.params.id),
    subjectId : req.body.subjectId
  })
    .then(()=>{
      res.redirect('/students');
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

module.exports = router;
