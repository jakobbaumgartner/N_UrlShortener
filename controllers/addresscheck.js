const express = require('express');
const { url, sequelize } = require('../models/storage')
const {redirector} = require('./redirect')
const dns = require('dns');
var urlParse = require('url-parse');
const util = require('util')
var asyncDNS = util.promisify(dns.lookup)



async function checkfulladdress(longurl) {
	// checks if address as given is already in DB

	var result = await url.findOne({
		where: {
			longurl: longurl
		},
		raw: true

	})


	if (result != null) {
		console.log("Found LongURL.")

		return [true, result.longurl, result.shorturl, result.IPaddress, "DB"]
	}
	else {
		console.log("Not Found LongURL.")
		return [false, null, null, "DB"]
	}

}





async function checkDNS(longurl) {

	// checks if url exists using dns 

	const myURL = new URL('http://'+longurl)
	// creates URL element, to be used with URL parser, because 
	// DNS checker wants just a hostname

	console.log("DNS check initiated.")
	try {
		var value = await asyncDNS(myURL.hostname)

	}
	catch (err) {
		console.log("noDNS")
		return [true, longurl, null, null, "noDNS"]
	}

	return [false, longurl, null, value.address, "noDNS"]

}





// async function checkIPaddress(longurl, ip) {

// 	// checks if address ip is already in DB

// 	var result = await url.findOne({
// 		where: {
// 			IPaddress: ip
// 		},
// 		raw: true

// 	})


// 	if (result != null) {
// 		console.log("Found ipURL.")

// 		return [true, result.longurl, result.shorturl, result.IPaddress, "IP_DB"]
// 	}
// 	else {
// 		console.log("Not Found LongURL.")
// 		return [false, longurl, null, ip, "noIP_DB"]
// 	}

// }





async function createnewaddress(longurl, addressIP) {
	var timeelement = new Date();

	// creates new address entery in the database

	try {
		var shorturl = timeelement.getTime()
		var value = url.create({ longurl: longurl, shorturl: shorturl, IPaddress: addressIP })

	}
	catch (err) {
		throw new Error(err)

	}

	console.log("New address added.")
	return [false, longurl, shorturl, addressIP, 'NEW_DB']

}

module.exports = {checkDNS, checkfulladdress, createnewaddress}