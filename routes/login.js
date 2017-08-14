const router = require('express').Router();
const model = require('../models');
const session = require('express-session');

let user = {username:'guest', role:'guest'};

router.get('/', (req, res)=>{
    res.render('login', {title:'Login Page', errmsg:'', user: user});
})

router.post('/', (req, res)=>{
    console.log('hahaha');
    //res.render('login', {title: req.body.username});
    model.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user=>{
        if(user.password == req.body.password){
            req.session.user = {
                username: user.username,
                role: user.role
            };
            req.session.hasLogin = true;
            res.redirect('/');
        }else{
            res.render('login', {title:'Login Page', errmsg: 'wrong password, try again..', user: user});
        }
    }).catch(err=>{
        res.render('login', {title:'Login Page', errmsg: 'username doesnt exist', user: user});
    })
})

module.exports = router;