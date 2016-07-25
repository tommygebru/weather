var WeatherApp =  function()
{ 
  // Will contain data from the IP address geolocation api.
  var geoLocationData = null;
  // Will contain data from the weather condition api.
  var weatherData = null;
  // Will contain various ajax or dom event handler callback functions.
  var handlers = {};
  
  var startup = function()
  {
    $.getJSON( "https://freegeoip.net/json/", handlers.geoLocation );
    console.log(777);
  };
  
  handlers.toggleTemperature = function()
  {
    var visible = $('.red span :visible');
    var hidden = $('.red span :hidden');
    visible.fadeToggle();
    visible.promise().done( function(){ hidden.fadeToggle(); } )
  };
  
  handlers.geoLocation = function(getGeo) 
  {
    // store in app-wide variable
    geoLocationData = getGeo;
    
    var weatherApiUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?'
    + 'lat=' + geoLocationData.latitude 
    + '&lon=' + geoLocationData.longitude
    + '&appid=52c662f3c521e182bbc01e8ca55a3944';
    $.getJSON( weatherApiUrl, handlers.weathermap );
  };
  
  handlers.weathermap = function( input )
  {
    weatherData = input;
    
    var city = geoLocationData.city;
    var region = geoLocationData.region_code;
    var cityRegion = "in " + city + ", " + region;
    var description = weatherData.weather[0].description;
    var descriptionReplace = description.replace(description[0], description[0].toUpperCase());
    var descriptionUpdate = descriptionReplace + " " + cityRegion;
      
    var main = weatherData.weather[0].main;
    var id = weatherData.weather[0].id;
    var kelvin = weatherData.main.temp;
    var fahrenheit = Math.round(1.8 * (kelvin - 273) + 32);
    var celsius = Math.round(kelvin - 273);
    //console.log("Success with kelvin: " + kelvin);

    var tempf = fahrenheit + "° F";
    var tempc = celsius + "° C";

    $(".red h1:nth-child(1)").text(tempf);
    $(".red h1:nth-child(2)").text(tempc);

    $(".red span").click( handlers.toggleTemperature );
      
        
    $("#span").html("<i class='wi wi-owm-" + id + "'></i><h1>" + main + "</h1>");
    //console.log("<i class='wi wi-owm-" + id + "'></i><h1>" + main + "</h1>");
       
    document.getElementById("blue").innerHTML = new Date().toUTCString();
      
    $(".coffee span").html(descriptionUpdate);
  };
  
  // Finally, run the startup function after defining everything it needs
  startup();
  // and return the object itself.
  return this;
}; // end WeatherApp definition

//-----------------------------

$(document).ready(function(){ app = new WeatherApp(); }); //end ready