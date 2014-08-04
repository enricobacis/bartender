var express = require('express');
var app = express();

var drinks = {
	'beer' : { description : 'the ideal drink for every occasion', price : 4.00 },
	'negroni' : { description : 'a punch in your face', price : 6.00 },
	'wine' : { description : 'red wine and the world is better', price : 3.50 }
};

app.use( express.json() );

app.get('/', function(req, res) {
	res.json(drinks);
});

app.post('/order',function(req, res) {

	if (!req.body.hasOwnProperty('table') ||
		!req.body.hasOwnProperty('drinks')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	console.log('\nNew order from table %d', req.body.table);

	var total = 0;

	req.body.drinks.forEach(function (drink) {
		var price = drinks[drink.name]['price'];
		console.log('%d %s  (* %d$): %d$',
			drink.howmany, drink.name, price, price * drink.howmany);
		total += price * drink.howmany;
	});

	console.log('Total: %d$\n', total);
	res.json({ 'table' : req.body.table, 'total' : total + '$'});

});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
