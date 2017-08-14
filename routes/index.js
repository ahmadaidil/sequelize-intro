const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res)=>{
  res.render('index', {title:'sequelize intro, association, partial & helper', user:req.session.user});
});

router.get('/logout', (req, res)=>{
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
