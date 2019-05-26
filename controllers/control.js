const express = require('express');
const { url, sequelize } = require('../models/storage')
const {redirector} = require('./redirect')
const dns = require('dns');
var urlParse = require('url-parse');
const util = require('util')
var asyncDNS = util.promisify(dns.lookup)
const {checkDNS, checkfulladdress, createnewaddress} = require('./addresscheck')



var app = express()

module.exports.redirect = (req, res) => {

	redirector(req, res)

}


module.exports.renderpage = (req, res) => {

	url.findAll({raw: true}).then((list) => {
		//console.log(list)
		res.render('index', {list: list});
		console.log("renderpage")
	}
	)

}


module.exports.addresspoted = (req, res) => {

	test(req, res)
	.then(() => {
		res.redirect('/');
		console.log("redirected")

	}
	)

}



async function test(req, res) {

	
	var longurl = (req.body.lurl).toLowerCase();
	console.log("First line ran.")
	var result = await checkfulladdress(longurl)

	if (result[0]) {
		console.log(result)
		return result
	}

	// these if loops cancel execution, if the needed result is reached. Functions always
	// give conformation if no more steeps are needed (first argument in returned array - boolean)

	result = await checkDNS(longurl)

	if (result[0]) {
		console.log(result)
		return result
	}

	// var result = await checkIPaddress(longurl, result[3])

	// if (result[0]) {
	// 	console.log(result)
	// 	return result
	// }

	var result = await createnewaddress(longurl, result[3])

	console.log("Last line ran.")


}

