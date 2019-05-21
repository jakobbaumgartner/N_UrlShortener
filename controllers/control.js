const express = require('express');
const dnsPromises = require('dns').promises;
const app = express()
const dns = require('dns');
const { url, sequelize } = require('../models/storage')
var d = new Date();



module.exports.first = (req, res) => {
	res.render('index', { layout: false })

}

module.exports.check = (req, res) => {

	var longurl = req.body.lurl
	var addressIP = ''

	// checks if address as given is already in DB

	url.findOne({
		where: {
			longurl: longurl
		},
		raw: true
	}).then(result => {
		if (result != null) {
			console.log("Found LongURL.")
			return ['address', 'DB']
		}
	}).catch(err => {
		console.log(err)
		return ['DB', 'ERR']
	})

	// checks if url exists using dns 

	dns.lookup(longurl, (err, address, family) => {
		if (err != null) {

			return ['no', 'ERR']
		}

		else {

			addressIP = address
			console.log(addressIP + " DNS found.")
		}
	});
	// address: "192.0.43.8" family: IPv4

	url.findOne({
		where: {
			IPaddress: addressIP
		},
		raw: true
	}).then(result => {
		if (result != null) {
			return ['result.shorturl', 'DB']
		}
	}).catch(err => {
		console.log(err)
		return ['DB', 'ERR']
	})

	url.create({longurl: longurl, shorturl: d.getTime(), IPaddress: addressIP} )
	.then(result => {
		console.log("New address added.")
		return [result.shorturl, 'NEW']
	})



	res.redirect('/');
}

function checkfulladress () {
		// checks if address as given is already in DB

		url.findOne({
			where: {
				longurl: longurl
			},
			raw: true
		}).then(result => {
			if (result != null) {
				console.log("Found LongURL.")
				return ['address', 'DB']
			}
			
		}).catch(err => {
			console.log(err)
			return ['DB', 'ERR']
		})
	
}