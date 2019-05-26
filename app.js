const express = require('express');
//const dnsPromises = require('dns').promises;
const path = require('path')
var bodyParser = require('body-parser')
const control = require('./controllers/control')
const Sequelize = require('sequelize');
const mysql = require('mysql2')
const {url, sequelize} = require('./models/storage')
const dns = require('dns');
var urlParse = require('url-parse');

const util = require('util')


const app = express()
// syncing database model
url.sync()
  
// css and js static folders 
app.use(express.static(path.join(__dirname, 'public')))


// views engine settings

let ejs = require('ejs')

app.set('view engine', 'ejs');
//app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }))

app.post('/new', control.addresspoted);

app.use('/nl', control.redirect)


app.use('/',control.renderpage)




app.listen(5000, () => {
	console.log(`Server started on port`);
});