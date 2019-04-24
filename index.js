
  var positions = document.querySelector('.positions');
  document.querySelector('button').addEventListener("click",getWeather );
   function getWeather() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        positions.innerHTML = "Latitude:"+ lat + "\n"+" Longitude:" + long;

      })
    }
       else if (!navigator.geolocation){
              console.log("not aloowed")
            window.alert("Could not get location");
      }
  }
