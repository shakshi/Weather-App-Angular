//Importing dependencies 
var express= require('express');
var app= express();
const https= require('https');
const url = require('url');

var path= require('path');
app.use(express.static(path.join(__dirname, 'dist/first-angular-app')));

forecast_apikey="###########";
google_apikey= "##########";
google_search_engine_id = '##########';

/*
/suggestions/?term=Los   
*/
app.get('/suggestions/', function(req, res){
	
	term= 'Los';
	term= req.query.term;
	
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

	places_url= "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + term + "&types=(cities)&language=en&key=" + 
	google_apikey;

	console.log(places_url);
	https.get(places_url, (resp) => {
		let data="";
		resp.on('data', (chunk) => {
			data+= chunk;
		});

		resp.on('end', () => {
			return res.send(data);
		});
	});

}).on("error", (err) => {
	console.log("Error: ", err.message);
});

/*
/location/?address=Los Angeles, CA, USA
/location/?address=Mumbai, India
/location/?address=Beijing, China

*/
app.get('/location/', function(req, res){
	
	address="Los Angeles, CA, USA";
	address= req.query.address;
	
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

	maps_url= "https://maps.googleapis.com/maps/api/geocode/json?address="  
	+ address + "&key=" + google_apikey;
	
	console.log(maps_url);
	https.get(maps_url, (resp) => {
		let data="";
		resp.on('data', (chunk) => {
			data+= chunk;
		});

		resp.on('end', () => {
			return res.send(data);
		});
	});

}).on("error", (err) => {
	console.log("Error: ", err.message);
});

/*
/weather/?lat=34.0322&long=-118.2836    
*/
app.get('/weather/', function(req, res){
	
	lat= '34.0322';
	long= '-118.2836';
	
	lat= req.query.lat;
	long= req.query.long;

	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

	forecast_url="https://api.darksky.net/forecast/" + forecast_apikey + "/" + lat + "," + long;

	https.get(forecast_url, (resp) => {
		let data="";
		resp.on('data', (chunk) => {
			data+= chunk;
		});

		resp.on('end', () => {
			return res.send(data);
		});
	});

}).on("error", (err) => {
	console.log("Error: ", err.message);
});

/*
/state-seal/?state=California
*/
app.get('/state-seal/', function(req, res){

	state= req.query.state;

	/*google_custom_url=
	'https://www.googleapis.com/customsearch/v1?q=Seal%20of%20' + 
	state + '&cx=' + google_search_engine_id + 
	'&imgSize=huge&imgType=news&num=1&searchType=image&key=' + google_apikey;
	*/

	google_custom_url = "https://www.googleapis.com/customsearch/v1?q=" + 
	state + "%20State%20Seal" +  
	"&cx=" +  google_search_engine_id +
	"&imgSize=large&num=1&searchType=image&key="+ google_apikey;
	
	console.log(google_custom_url);

	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

	https.get(google_custom_url, (resp) => {
		let data="";
		resp.on('data', (chunk) => {
			data+= chunk;
		});

		resp.on('end', () => {
			return res.send(data);
		});
	});
});

/*
/city/?city=Seattle
*/
app.get('/city/', function(req, res){

	city= req.query.city;

	/*google_custom_url=
	'https://www.googleapis.com/customsearch/v1?q="+ state + '&cx=' + google_search_engine_id + 
	'&imgSize=huge&imgType=news&num=8&searchType=image&key=' + google_apikey;
	*/

	google_custom_url = "https://www.googleapis.com/customsearch/v1?q=" + 
	city +  "&cx=" +  google_search_engine_id +
	"&imgSize=huge&num=8&searchType=image&key="+ google_apikey;
	
	console.log(google_custom_url);

	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

	https.get(google_custom_url, (resp) => {
		let data="";
		resp.on('data', (chunk) => {
			data+= chunk;
		});

		resp.on('end', () => {
			return res.send(data);
		});
	});
});

/*
/weather-detail/?lat=34.0322&long=-118.2836&time=1573428663  
send time in secs  
for modal - imprtant 
*/
app.get('/weather-detail/', function(req, res){
	
	lat= '34.0322';
	long= '-118.2836';
	time = '1573428663';
	lat= req.query.lat;
	long= req.query.long;
	time= req.query.time;

	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

	detail_url= "https://api.darksky.net/forecast/"+ forecast_apikey + "/" + lat + "," + long + "," + time;
	
	https.get(detail_url, (resp) => {
		let data="";
		resp.on('data', (chunk) => {
			data+= chunk;
		});

		resp.on('end', () => {
			return res.send(data);
		});
	});

}).on("error", (err) => {
	console.log("Error: ", err.message);
});

port=  process.env.PORT;
//port = 8081;
app.listen(port, () => {
    console.log('Server started!');
    console.log('on port');
});
