
var click = document.querySelector('button');
click.addEventListener("click", getPosition);

function getPosition() {
  click.style.display = "none";
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = (position.coords.latitude).toFixed(2);
        var long = (position.coords.longitude).toFixed(2);
        getWeather(lat, long);
      })
    }
    else {
      window.alert("Could not get location");
    }
  }

function getWeather(latitude, longitude){

  var weatherData = [];
  const endpoint = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => displayWeather(data.name, data.sys.country, data.main.temp,data.weather[0].main,data.weather[0].icon));
}
function displayWeather(name, country, temperatureInC, type, icon) {
  var region = document.querySelector('.region');
  var description = document.querySelector('.description');
  var image = document.querySelector('img');
  region.innerHTML = name + "," + country ;
  description.innerHTML = type;
  image.src = icon;
  displayTemperature(temperatureInC);
}

function displayTemperature(temperatureInC){
  let symbol = "C";
  var temp = document.querySelector('.temperature');
  temp.innerHTML = temperatureInC +" °" +`<span class = "celcius">${symbol}<span>`;
  document.querySelector('.celcius').addEventListener('click',function(){
    let  temperatureInF = convertTempIntoF(temperatureInC) ;
    symbol = 'F';
    temp.innerHTML = temperatureInF +" °" +`<span class = "celcius">${symbol}<span>`;

  });
  }
  function convertTempIntoF(temperatureInC){
    return ((temperatureInC * 1.8) + 32).toFixed(2);
  }
