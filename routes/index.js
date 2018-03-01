var express = require('express');
var Geocoder = require('node-geocoder');
var router = express.Router();

function getLatitudeLongitude(address, res) {
	let latitude, longitude;
	var options = {
		provider: 'google',
		httpAdapter: 'https',
		apiKey: 'AIzaSyBPfa7eAe7vjoQFO5v_T2hgQmZ2LeQIPxY',
		formatter: null
	};
	var geocoder = Geocoder(options);
  address = address;

	var maps = new Promise(function (resolve, rejected) {
    geocoder.geocode({'address' : address}, function (err, result){
			if (err){
				rejected(err);
			} else {
				resolve(result);
			} 
    })
	});

	maps.then(function(result) {
		latitude = result[0].latitude;
		longitude = result[0].longitude;
		res.render('index', { address: address, lat: latitude, long: longitude});
	}).catch(function(err) {
			console.log(err);
		})
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
	console.log(req.body.address);
	var address = req.body.address;
	getLatitudeLongitude(address, res);
});

module.exports = router;
