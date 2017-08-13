const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routeIndex = require('./routes/index');
const routeTeachers = require('./routes/teachers');
const routeSubjects = require('./routes/subjects');
const routeStudents = require('./routes/students');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routeIndex);
app.use('/teachers', routeTeachers);
app.use('/subjects', routeSubjects);
app.use('/students', routeStudents);

app.listen(3000, ()=>{
  console.log('listening port 3k LOL');
})
