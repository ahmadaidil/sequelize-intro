const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  model.subject.findAll({order: [['id', 'ASC']]})
    .then(subjects=>{
      //res.render('subjects', {data:subjects});
      let promises = subjects.map(subject=>{
        console.log(subject);
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
          res.render('subjects', {data:subjects});
        })
        .catch(err=>{
          res.send(err.toString());
        })
    })
    .catch(err=>{
      res.send(err.toString());
    })
})

module.exports = router;
