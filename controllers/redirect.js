const express = require('express');
const { url, sequelize } = require('../models/storage')
const dns = require('dns');
//const urlnode = require('url');
const util = require('util')
var asyncDNS = util.promisify(dns.lookup)

var app = express()


module.exports.redirector = (req, res) => {


var urlpathname = req.url

console.log(urlpathname)


url.findOne({where: {shorturl: urlpathname.substring(1)}, raw: true}).then((link) => {
	if(link == null) {
		 res.redirect('/');
	}
	else { res.redirect(('http://'+link.longurl));

	}
})


}