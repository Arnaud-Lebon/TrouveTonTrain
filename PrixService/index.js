const express = require('express');
const app = express();
var cors = require('cors')
const https = require('https');
app.use(cors())
app.get('/', (req, res) => {
  console.log('prixservice received a request.');
  var dist = req.query.distance;
  var symbol = req.query.symbol === undefined ? "EUR" : req.query.symbol;
  var value = 1.0;

	if (symbol !== "EUR"){
		sendGET(symbol).then(function(val){
		    value = val;
		    value /= 4.0; //0.25€/km
  			res.send((dist*value).toString());
		}).catch(function(err) {
		    console.log(err);
		});
	}else{
		value /= 4.0; //0.25€/km

  		res.send((dist*value).toString());
	}
    
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('prixservice listening on port', port);
});

function sendGET(symbol){
	return new Promise(function(resolve, reject){
        https.get('https://api.exchangeratesapi.io/latest?symbols=' + symbol, (resp) => {
  		let data = '';

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			const j = JSON.parse(data);
			for (var i in j.rates)
				resolve(j.rates[i]);
		});

		}).on("error", (err) => {
			console.log("Error: " + err.message);
		});
    });
	
}