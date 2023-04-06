async function makeCityList(cityName = '') {
	const APIKEY = await fetch('./libs/config.json')
					.then(response => response.json())
					.then(response => {return response});
	
	cityName = document.getElementById('userInput').value;
	let arrayCities = [];
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': APIKEY.cityKey,
			'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
		}
	};
	fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/locations/' + await CitytoCoords(cityName) +'/nearbyCities?radius=100&minPopulation=10000', options)	
	.then(response => response.json())
	.then(response => {
		document.body.innerHTML = "";
		for(var key in response.data) {
			arrayCities.push(response.data[key].city);
		}
		document.write(arrayCities + '.');
	})
	.catch(err => console.error(err));
}

async function CitytoCoords(cityName = '') {
	const APIKEY = await fetch('./libs/config.json')
					.then(response => response.json())
					.then(response => {return response});

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': APIKEY.cityKey, 
			'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
		}
	};
	
	latLong = await fetch('https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=' + cityName + '&accept-language=en&polygon_threshold=0.0', options)
		.then(response => response.json())
		.then(response => {latLong = response[0].boundingbox[0];
						   latLong += response[0].boundingbox[2];
						   return latLong;})
	return latLong;						
}

