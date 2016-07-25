var WeatherApp =  function()
{ 
  // Will contain data from the IP address geolocation api.
  var geoLocationData = null;
  // Will contain data from the weather condition api.
  var weatherData = null;
  // Will contain functions that perform network requests.
  var gofetch = {};
  // Will contain various ajax or dom event handler callback functions.
  var handlers = {};
  
  var startup = function()
  {
    gofetch.geoLocation()
    .then( handlers.geoLocation )
      .fail(function(x) {
        console.log( "First $.get failed! Will retry everything one more time. ",x );
        startup();
      })
    .then( gofetch.weathermap )
    .then( handlers.weathermap )
    .then( updatePage );
  };
  
  gofetch.geoLocation = function() {
    // Returns a Promise
    console.log('fetching geolocation');
    return $.getJSON( "https://freegeoip.net/json/" );
  };
  
  gofetch.weathermap = function() {
    console.log('fetching weathermap');
    var weatherApiUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?'
    + 'lat=' + geoLocationData.latitude 
    + '&lon=' + geoLocationData.longitude
    + '&appid=52c662f3c521e182bbc01e8ca55a3944';
    // Returns a Promise
    return $.getJSON( weatherApiUrl );
  };

  handlers.toggleTemperature = function()
  {
    // Find currently visible & invisible elments
    var visible = $('.red span :visible');
    var hidden = $('.red span :hidden');
    // Fade out the visible element.
    visible.fadeToggle();
    // After the fade-out effect is "done", fade-in the other element.
    visible.promise().done( function(){ hidden.fadeToggle(); } )
  };
  
  // Sets app-wide geoLocationData var.
  // input param must be data from an ajax request.
  handlers.geoLocation = function(input) 
  {
    console.log('handling geolocation');
    geoLocationData = input;
  };
  
  // Sets app-wide weatherData var.
  // input param must be data from an ajax request.
  handlers.weathermap = function( input )
  {
    console.log('handling weathermap');
    weatherData = input;
  };
  
  // Updates contents of page elements
  // using values in geoLocationData & weatherData
  var updatePage = function()
  {
    console.log('updating page');
    
    var geo = geoLocationData;
    var weather = weatherData.weather[0];
    
    // Build description text:
    var description = weather.description + " in " + geo.city + ", " + geo.region_code;
    // Capitalize the first letter:
    description = description.replace(description[0], description[0].toUpperCase());
      
    var main = weather.main;
    var id = weather.id;
    var kelvin = weatherData.main.temp;
    var fahrenheit = Math.round(1.8 * (kelvin - 273) + 32);
    var celsius = Math.round(kelvin - 273);

    var tempf = fahrenheit + "° F";
    var tempc = celsius + "° C";

    // Update temperature area
    $(".red h1:nth-child(1)").text(tempf);
    $(".red h1:nth-child(2)").text(tempc);

    // Watch for clicks on the temperature area.
    $(".red span").click( handlers.toggleTemperature );
    
    // Update icon area
    $("#span").html("<i class='wi wi-owm-" + id + "'></i><h1>" + main + "</h1>");
    
    // Update date area
    var dateElement = document.getElementById("blue");
    dateElement.innerHTML = new Date().toUTCString();
      
    $(".coffee span").html(description);
    
    var intervalid = setInterval( function(){
       dateElement.innerHTML = new Date().toUTCString(); 
     }, 1000 );
    
  };
  
  // Finally, run the startup function after 
  // defining everything it requiries to run.
  startup();
  // and return the object itself.
  return this;
}; // end WeatherApp definition

//-----------------------------

$(document).ready(function(){ app = new WeatherApp(); }); //end ready