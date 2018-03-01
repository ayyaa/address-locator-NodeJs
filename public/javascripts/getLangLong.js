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