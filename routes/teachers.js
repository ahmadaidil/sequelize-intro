const express = require('express');
const router = express.Router();
const model = require('../models');
const session = require('express-session');

router.get('/', (req, res)=>{
  model.teacher.findAll({order: [['first_name', 'ASC']]})
    .then(teachers=>{
      //res.render('teachers', {data:teachers});
      let promises = teachers.map(teacher=>{
        return new Promise((resolve, reject)=>{
          teacher.getSubject()
            .then(subject=>{
              if(teacher.subjectId != null){
                teacher['subject'] = subject.subject_name;
              }
              return resolve(teacher);
            })
        })
      })
      Promise.all(promises)
        .then(teachers=>{
          res.render('teachers', {data: teachers, title:'All Teachers Data', user:req.session.user});
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
  model.subject.findAll()
    .then(subjects=>{
      res.render('add-teacher', {err:false, dataSubjects:subjects, title:'Add New Teacher'});
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
    model.subject.findAll()
      .then(subjects=>{
        res.render('add-teacher', {dataSubjects:subjects, err:err, errmsg:'Email is already used', title:'Add New Teacher'});
      })
      .catch(err=>{
        res.send(err.toString());
      })
  })
});

router.get('/edit/:id', (req, res)=>{
  model.teacher.findById(req.params.id)
    .then(teacher=>{
      model.subject.findAll()
        .then(subjects=>{
          res.render('edit-teacher', {dataTeacher:teacher, dataSubjects:subjects, title:'Edit Teacher Data'});
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
