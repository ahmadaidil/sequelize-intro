const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('index', {title:'sequelize intro, association, partial & helper'});
});

module.exports = router;
