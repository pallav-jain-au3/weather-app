function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function sucess(position) {
      var lat = (position.coords.latitude).toFixed(2);
      var long = (position.coords.longitude).toFixed(2);
      getWeather(lat, long);
      console.log(lat,long);
    },
  function error(){
    alert("Location Denied");
  })
  }
  else {
    window.alert("Could not get location");
  }
}


function getWeather(latitude, longitude) {
  const weatherAPI = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude;
  $.get(weatherAPI, function (data){
    displayWeather(data.name, data.sys.country, data.main.temp, data.weather[0].main, data.weather[0].icon);
  });
}


function displayWeather(city, country, temperatureInC, weatherType, weatherIcon) {
  var region = document.querySelector('.region');
  var description = document.querySelector('.description');
  var image = document.querySelector('img');
  region.innerHTML = city + "," + country;
  description.innerHTML = weatherType;
  image.src = weatherIcon;
  displayTemperature(temperatureInC);
}


 function displayTemperature(temperatureInC) {
   let tempUnit = "C";
   var temp = document.querySelector('.temperature');
   temp.innerHTML = temperatureInC + " °" + `<span class = "temp-value">${tempUnit}<span>`;
   temp.addEventListener('click', function (){
        if (tempUnit == "C"){
          let temperatureInF = convertTempIntoF(temperatureInC);
          tempUnit = "F";
          temp.innerHTML = temperatureInF + " °" + `<span class = "temp-value">${tempUnit}<span>`;
        }
        else {
        tempUnit = "C";
        temp.innerHTML = temperatureInC + " °" + `<span class = "temp-value">${tempUnit}<span>`;

        }
   });
 }

 function convertTempIntoF(temperatureInC) {
   return ((temperatureInC * 1.8) + 32).toFixed(2);
 }

getPosition();
