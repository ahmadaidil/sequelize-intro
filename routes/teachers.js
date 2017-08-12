const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  model.teacher.findAll({order: [['id', 'ASC']]})
    .then(teachers=>{
      res.render('teachers', {data:teachers});
    })
    .catch(err=>{
      res.send(err.toString());
    })
})

router.get('/add', (req, res)=>{
  model.subject.findAll()
    .then(subjects=>{
      res.render('add-teacher', {err:false, dataSubjects:subjects});
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.post('/add', (req, res)=>{
  model.teacher.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    subjectId:req.body.subjectId
  }).then(task=>{
    res.redirect('/teachers');
  }).catch(err=>{
    res.render('add-teacher', {err:err});
  })
});

router.get('/edit/:id', (req, res)=>{
  model.teacher.findById(req.params.id)
    .then(teacher=>{
      model.subject.findAll()
        .then(subjects=>{
          res.render('edit-teacher', {dataTeacher:teacher, dataSubjects:subjects});
        })
        .catch(err=>{
          res.send(err.toString());
        })
    })
    .catch(err=>{
      res.send(err.toString());
    })
});

router.post('/edit/:id', (req, res)=>{
  model.teacher.update({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    subjectId:req.body.subjectId
  },{
    where:{id:req.params.id}
  }).then(task=>{
    res.redirect('/teachers');
  }).catch(err=>{
    res.send(err.toString());
  })
});

router.get('/delete/:id', (req, res)=>{
  model.teacher.destroy({
    where:{id:req.params.id}
  }).then(task=>{
    res.redirect('/teachers')
  }).catch(err=>{
    res.send(err.toString());
  });
});

module.exports = router;