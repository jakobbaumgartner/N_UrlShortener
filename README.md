# N_UrlShortener

To je preprost Url Shortener program. V vnosno polje vnesemo URL, program bo:

1. preveril, če je dani url že v bazi. -> če je že naredi nič, url je že spodaj na listi.
2. preveril, če host tega url obstaja, preko DNS serverja
3. če obstaja "DNS host" ustvaril skrajšan naslov, ga shranil v podatkovno bazo 
4. izpisal nov naslov na vrhu liste naslovov in njihov krajšav

Sedaj lahko do naslova dostopamo preko naše domene in šifre, ki je dodeljena vsakemu vnosu. 




## Uporabljeno

Program uporablja sintakso Async-Await. Za funkcijo, ki uporablja callback() sem uporabil util.promisify za prireditev na pravo sintakso.

* nodejs tehnologija
	* DNS modul
	* url-parse modul
	* util.promisify modul
* EXPRESS framework
* sequelize ORM
* MySQL database
* EJS templating engine
* Bootstrap framework

