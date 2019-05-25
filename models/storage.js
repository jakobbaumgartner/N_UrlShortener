const Sequelize = require('sequelize');
const mysql = require('mysql2')


// Option 1: Passing parameters separately
const sequelize = new Sequelize('jnotes_db', 'root', 'brun13cajt', {
  host: 'localhost',
  dialect: 'mysql' 
});

const url = sequelize.define('url', {
	// attributes
	longurl: {
	  type: Sequelize.STRING,
	  allowNull: false
	},
	shorturl: {
	  type: Sequelize.STRING,
	  allowNull: false
	  // allowNull defaults to true
	},
	IPaddress: {
	  type: Sequelize.STRING,
	  allowNull: false
	  // allowNull defaults to true
	}
  }, {
	// options
	});
	
	

module.exports.sequelize = sequelize
module.exports.url = url