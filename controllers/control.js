const express = require('express');
const dnsPromises = require('dns').promises;
const app = express()


module.exports.first = (req, res) => {
	res.render('index', {layout: false})
	
}

module.exports.check = (req, res) => {

	console.log('----->>> ')



	///doesnt work




	res.render('index', {layout: false, result: result});
}

