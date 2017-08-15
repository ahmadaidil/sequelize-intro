const express = require('express');
const router = express.Router();
const model = require('../models');
const session = require('express-session');

router.get('/', (req, res)=>{
  model.user.findAll({order: [['id', 'ASC']]})
    .then(users=>{
      res.render('users', {title:'All Users Data', users:users, user:req.session.user, err:''})
    })
    .catch(err=>{
      res.send(err.toString());
    })
})

router.post('/', (req, res)=>{
  model.user.create({
    username:req.body.username,
    password:req.body.password,
    role:req.body.role,
    private_key:'ajkhfahfajhf'
  }).then(()=>{
    res.redirect('/users');
  }).catch(err=>{
    console.log(err);
    model.user.findAll({order: [['id', 'ASC']]})
      .then(users=>{
        res.render('users', {title:'All Users Data', user:users, user:req.session.user, err:err})
      })
      .catch(err=>{
        res.send(err.toString());
      })
  })
});

// router.get('/edit/:id', (req, res)=>{
//   model.teacher.findById(req.params.id)
//     .then(teacher=>{
//       model.subject.findAll()
//         .then(subjects=>{
//           res.render('edit-teacher', {dataTeacher:teacher, dataSubjects:subjects, title:'Edit Teacher Data', user:req.session.user});
//         })
//         .catch(err=>{
//           res.send(err.toString());
//         })
//     })
//     .catch(err=>{
//       res.send(err.toString());
//     })
// });

// router.post('/edit/:id', (req, res)=>{
//   model.teacher.update({
//     first_name:req.body.first_name,
//     last_name:req.body.last_name,
//     email:req.body.email,
//     subjectId:req.body.subjectId
//   },{
//     where:{id:req.params.id}
//   }).then(task=>{
//     res.redirect('/teachers');
//   }).catch(err=>{
//     res.send(err.toString());
//   })
// });

router.get('/delete/:id', (req, res)=>{
  if(req.session.user.role == 'headmaster'){
    model.user.destroy({
      where:{id:req.params.id}
    }).then(task=>{
      res.redirect('/users')
    }).catch(err=>{
      res.send(err.toString());
    });
  }else{
    res.redirect('/users')
  }
});

module.exports = router;
