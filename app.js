const express = require('express');
const dnsPromises = require('dns').promises;
const path = require('path')
var bodyParser = require('body-parser')
const control = require('./controllers/control')
const Sequelize = require('sequelize');
const mysql = require('mysql2')
const {url, sequelize} = require('./models/storage')

const app = express()
// syncing database model
url.sync().then(() => {

  // return url
 
});
  
// css and js static folders 
app.use(express.static(path.join(__dirname, 'public')))

var expressHbs  = require('express-handlebars');

// views engine settings

app.engine(
  'hbs',
  expressHbs({
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main-layout',
	extname: 'hbs'
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }))

app.post('/post/new', control.check);

app.use('/',( control.first));



app.listen(3000, () => {
	console.log(`Server started on port`);
});