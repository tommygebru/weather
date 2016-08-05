$(document).ready(function() {
  var api;

  var urlGeo = "https://freegeoip.net/json/";
  $.getJSON(urlGeo, function(getGeo) {
    //console.log("Success with urlGeo: ");
    var lat = getGeo.latitude;
    var lon = getGeo.longitude;
    var city = getGeo.city;
    var region = getGeo.region_code;
    var cityRegion = "in " + city + ", " + region;
    api = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=52c662f3c521e182bbc01e8ca55a3944';
    //console.log("Success with api: " + api);
    $.getJSON(api, function(getData) {

      var description = getData.weather[0].description;
      var descriptionReplace = description.replace(description[0], description[0].toUpperCase());
      var descriptionUpdate = descriptionReplace + " " + cityRegion;
      //console.log(descriptionUpdate);
      
      //var icon = getData.weather[0].icon;//trash
      //var iconLink = "http://openweathermap.org/img/w/" + icon + ".png"//trash
      
      var main = getData.weather[0].main;
      var id = getData.weather[0].id;
      var kelvin = getData.main.temp;
      var fahrenheit = Math.round(1.8 * (kelvin - 273) + 32);
      var celsius = Math.round(kelvin - 273);
      //console.log("Success with kelvin: " + kelvin);

      var tempf = fahrenheit + " ° F";
      var tempc = celsius + " ° C";
  
      $(".red h1:nth-child(1)").text(tempf);
      $(".red h1:nth-child(2)").text(tempc);

      $(".red span").click(function(){
      $(".red h1").toggle();
      });
      
        
      $("#span").html("<i class='wi wi-owm-" + id + "'></i><h1>" + main + "</h1>");
      //console.log("<i class='wi wi-owm-" + id + "'></i><h1>" + main + "</h1>");
       
      
      function myFunction() {
    var setDate = new Date();
    var getDate = setDate.toUTCString();
    
    document.getElementById("blue").innerHTML = getDate;
}
      myFunction();
      
 /*
      console.log(id);
      switch (id) {
        case id > 199 && id < 300:
          $(".blue span").html('<h1>"You should grab an umbrella"</h1>');
          break; //good 200  

        case id > 299 && id < 400:
          $(".blue span").html('<h1>"You should grab a jacket"</h1>');
          break; //good 300

        case id > 499 && id < 600:
          $(".blue span").html('<h1>"You should grab an umbrella"</h1>');
          break; //good 500

        case id > 599 && id < 700:
          $(".blue span").html('<h1>"Caution: strange atmosphere today"</h1>');
          break; //good 600
        
        case id > 799 && id < 900:
          $(".blue span").html('<h1>"Let\'s have some fun in the sun"</h1>');
          break; //good 800

        case id < 909:
          $(".blue span").html('<h1>"Caution: extreme weather today!"</h1>');
          break; //good 900-909//EXTREME

        case id < 957:
          $(".blue span").html('<h1>"Let\'s have some fun in the sun"</h1>');
          break; //good 910-957

        case id > 957:
          $(".blue span").html('<h1>"Caution: extreme weather today!"</h1>');
          break; //good 957 + ^//EXTREME AGAIN

        default:
          $(".blue span").html('<h1>"Have a great day, no matter what!"</h1>');
          //great default
      }
*/
      $(".coffee span").html(descriptionUpdate);

    }); //end Data

  }); //end Geo

}); //end ready
