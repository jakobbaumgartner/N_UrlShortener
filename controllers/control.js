const express = require('express');
//const dnsPromises = require('dns').promises;
const app = express()
const dns = require('dns');
const { url, sequelize } = require('../models/storage')
var d = new Date();




module.exports.first = (req, res) => {
	res.render('index', { layout: false })

}

module.exports.check =(req, res)  => {

//	var longurl = req.body.lurl
	var addressIP = ''
	var goonthen;

	// checks if address as given is already in DB

	checkfulladdress(req.body.lurl).then(x => {console.log("THENRREENNN")})
	console.log("Function EXITED.")
	
	// if(!goonthen[0]) {return goonthen}

	// // checks if url exists using dns 

	// goonthen = await checkDNS (req.body.lurl)

	// if(!goonthen[0]) {return goonthen}

	// // check if address as IP is already in DB

	// goonthen = await checkIPaddress (goonthen[1])

	// if(!goonthen[0]) {return goonthen}

	// // creates new input


	// goonthen = await createnewaddress (goonthen[1], req.body.lurl)






	res.redirect('/');
}

function checkfulladdress (longurl) {
		// checks if address as given is already in DB

		url.findOne({
			where: {
				longurl: longurl
			},
			raw: true
			
		})
		.then(() => {
			//if (result != null) {
				console.log("Found LongURL.")
				return new Promise ( (resolve) => resolve([false, 'address', 'DB'])) 
			// }
			// else {
			// 	console.log("Not Found LongURL.")
			// 	return new Promise(resolve => resolve([true]))
			// }
			
		})
	
}


function checkDNS (longurl) {
	// checks if url exists using dns 
	console.log("DNS check initiated.")
	dns.lookup(longurl, (err, address, family) => {
		if (err != null) {
			console.log('DNS not found.')
			return new Promise(resolve => resolve([false, 'no', 'ERR'])) 

		}

		else {

			console.log(addressIP + " DNS found.")
			return new Promise(resolve => resolve([true, address])) 

		}
	});
}

function checkIPaddress (addressIP) {
		// check if address as IP is already in DB

		url.findOne({
			where: {
				IPaddress: addressIP
			},
			raw: true
		}).then(result => {
			if (result != null) {
				return [false, 'result.shorturl', 'DB']
			}
			else {
				return [true, addressIP]
			}
		}).catch(err => {
			console.log(err)
			return ['DB', 'ERR']
		})
	
}

function createnewaddress (addressIP, longurl) {
		// creates new input

		url.create({longurl: longurl, shorturl: d.getTime(), IPaddress: addressIP} )
		.then(result => {
			console.log("New address added.")
			return [false, result.shorturl, addressIP, 'NEW']
		})
	
}
