$(document).ready( function() {
  
  var weather = {
    // API documentation: https://darksky.net/dev/docs/forecast
    "endpoint" : "https://api.darksky.net/forecast/",
    "proxy" : "https://cors-anywhere.herokuapp.com/",
    // The latitude of a location (in decimal degrees).
    // Positive is north, negative is south.
    "lat": 0,
    // The longitude of a location (in decimal degrees). 
    // Positive is east, negative is west.
    "lon" : 0,
    // Return weather conditions in the requested units.
    // auto: Automatically select units based on geographic location.
    // ca: same as si, except that windSpeed is in kilometers per hour.
    // uk2: same as si, except that nearestStormDistance and 
    //   visibility are in miles and windSpeed is in miles per hour.
    // us: Imperial units (the default)
    // si: SI units
    "unitSystem" : ["auto", "ca", "uk2", "us", "si"],
    // Setting up unit systems
    "units" : { 
      "ca" : {
        "temp" : "ºC",
        "windspeed" : "MPH",
        "pressure" : "HPa",
        "distance" : "Km",
        "precip" : "mm/h"
      },
      "uk2" : {
        "temp" : "ºC",
        "windspeed" : "MPH",
        "pressure" : "HPa",
        "distance" : "Mi",
        "precip" : "mm/h"
      },
      "us" : {
        "temp" : "ºF",
        "windspeed" : "m/s",
        "pressure" : "HPa",
        "distance" : "Mi",
        "precip" : "mm/h"
      },
      "si" : {
        "temp" : "ºC",
        "windspeed" : "m/s",
        "pressure" : "HPa",
        "distance" : "Km",
        "precip" : "mm/h"
      }
    },    
    // Dark Sky secret key. If you're forking this project,
    // please request your own API Key for free at https://darksky.net
    "apikey" : ""
  };
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
                  "Thursday", "Friday", "Saturday"];
  var monthName =  ['Jan','Feb','Mar','Apr','May','Jun',
                   'Jul','Aug','Sep','Oct','Nov','Dec'];
  var urlDarkSky = "https://api.darksky.net/forecast/";
  
  
  navigator.geolocation.getCurrentPosition( function(position) {
    weather.lat += position.coords.latitude;
    weather.lon += position.coords.longitude;
    
    var url = weather.proxy + weather.endpoint + weather.apikey + "/" + weather.lat + "," + weather.lon + "?units=" + weather.unitSystem[0];
    
           
    // Get and show the Weather
    $.getJSON(url, function(data) {
      
      // Get Location Name based on coordinates
      // Google Inverse Geocoding API (No API key needed)
      $.getJSON( "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + weather.lat + "," + weather.lon, function(location) {
        if ( location.status == "OK" ) {
          $("#location").text( location.results[1].formatted_address ); 
        }
        
      });
      // Finished getting Location Name
      
      // Writing Temperature, Summary and Icon to document.
      $( "#temp" ).text( data.currently.temperature + 
                        " " + weather.units[data.flags.units].temp );
      $("#summary").html("<p>Summary: <br>" + 
                         data.currently.summary + "</p>");
      $("#temp-icon").attr("src", "https://raw.githubusercontent.com/JoseBarakat/MyFCCProjects/master/LocalWeather/img/" + data.currently.icon + ".png");
      console.log("Icon for today's weather is > " +
                    data.currently.icon);
      
      // Writing Currently Weather Conditions.
      $( "#precip-intens" ).html( "<b>Precip. Intensity</b><p>" + 
                                 data.currently.precipIntensity + 
                                 " " + 
                                 weather.units[data.flags.units].precip +
                                 "</p>");
      
      $( "#precip-probab" ).html( "<b>Precip. Probability</b><p>" +
                                 data.currently.precipProbability +
                                 " %</p>" );
      $( "#wind" ).html( "<b>Wind</b><p>" + data.currently.windSpeed + " " +
                        weather.units[data.flags.units].windspeed + "</p>");
      $( "#humidity" ).html( "<b>Humidity</b><p>" +
                            data.currently.humidity*100 + " %</p>");
      
      $( "#dew" ).html( "<b>Dew Point</b><p>" + data.currently.dewPoint + 
                       " " + weather.units[data.flags.units].temp) + "</p>";
      $("#visibility").html( "<b>Visibility:</b><p>" +
                            data.currently.visibility + " " +
                            weather.units[data.flags.units].distance +
                            "</p>");
      $( "#pressure" ).html( "<b>Pressure:</b><p>" +
                            data.currently.pressure + " " +
                            weather.units[data.flags.units].pressure +
                            "</p>");
      $( "#ozone" ).html( "<b>Ozone:</b><p>" + data.currently.ozone + 
                         " EPA Index</p>");
      
      
      function showDailyForecast() {
        
        // Show daily forecast icon.
        $("#ds-icon").attr( "src", "https://raw.githubusercontent.com/JoseBarakat/MyFCCProjects/master/LocalWeather/img/" + data.daily.icon + ".png" );
        $("#ds-icon").attr( "alt", data.daily.icon );
        // Show daily forecast summary.
        $("#dfsummary").text(data.daily.summary);                
        
        // Show values for every day of the week.
        for ( var i = 0; i <= 7; i++ ) {
          // Unix timestamp (ms) with offset for every day of the week.
          var dailyTimestamp = ( data.daily.data[i].time * 1000 );
          
          // New Date Object based on Unix Timestamp
          var x = new Date( dailyTimestamp );       
          console.log( x.toString() + " - " + data.daily.data[ x.getDay() ].icon );
          
          // Write daily Date
          $( "#day" + i ).html("<b>" + x.toString().substring(0, 10) + "</b>");
          // Write daily forecast summary.
          $( "#ds" + i ).text( data.daily.data[x.getDay()].summary );
          
          // Write daily forecast icon.          
          $( "#d-icon-" + i ).attr( "src", "https://raw.githubusercontent.com/JoseBarakat/MyFCCProjects/master/LocalWeather/img/" + data.daily.data[ x.getDay() ].icon + ".png");
        }
        // Loop ends here
      }
      showDailyForecast();
            
      // Digital Clock      
      function startTime() {
        var now = new Date();
        var h = now.getHours();        
        var m = now.getMinutes();
        var s = now.getSeconds();
        var ampm = "";        
        if (h < 12) {
          ampm = "A.M.";
        } else {
          h = h - 12;
          ampm = "P.M.";
        }
        m = checkTime(m);
        s = checkTime(s);
        $("#time").html(h + ":" + m + ":" + s + " " + ampm + " - " +
                        data.timezone);
        var t = setTimeout(startTime, 500);
      }      
      // add zero in front of numbers < 10
      function checkTime(i) {
        if (i < 10) {i = "0" + i;}
        return i;
      }
      startTime();
      // End of Digital Clock block code
        
    });
    // Finished showing Weather
  
  });
  // Finished getting Geolocation data
  
  
  // Show today's date
  function showDate() {
    var today = new Date();
    var dayName = weekdays[ today.getDay() ];
    var dayNumber = today.getDate();
    var monthNumber = monthName[ today.getMonth() ];
    var year = today.getFullYear();
    $("#date").text(dayName + ", " + monthNumber + " " + 
                    dayNumber + ", " + year);
  }
  showDate();
  
});
