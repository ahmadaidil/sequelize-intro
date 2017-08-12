const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  model.subject.findAll({order: [['id', 'ASC']]})
    .then(subjects=>{
      res.render('subjects', {data:subjects});
    })
    .catch(err=>{
      res.send(err.toString());
    })
})


module.exports = router;
