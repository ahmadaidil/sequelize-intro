const app = require('express')();
const session = require('express-session');
const bodyParser = require('body-parser');

const routeLogin = require('./routes/login');
const routeIndex = require('./routes/index');
const routeTeachers = require('./routes/teachers');
const routeSubjects = require('./routes/subjects');
const routeStudents = require('./routes/students');
const routeUsers = require('./routes/users');

app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{}
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/login', routeLogin);

app.use((req,res, next)=>{
  if(!req.session.hasLogin){
    res.redirect('/login');
  }else{
    next();
  }
})

app.use('/', routeIndex);
app.use('/teachers', routeTeachers);
app.use('/subjects', routeSubjects);
app.use('/students', routeStudents);
app.use('/users', routeUsers);

app.listen(3000, ()=>{
  console.log('listening port 3k LOL');
})
