const darkSkyAPIKey = "364dbd3e44e68bdf5cd47e9842e07e5c"

$(document).ready(function() {
  window.getCurrentWeatherCondition = function(lat, lng) {
    console.log('running weather condition')
    var url = 'https://cors-anywhere.herokuapp.com/' + 'https://api.darksky.net/forecast/' + darkSkyAPIKey + '/' + lat + ',' + lng;
    var req = new Request(url);

    fetch(req)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      populateCurrentWeatherCondition(response.currently);
      populate5DaysWeatherForecast(response.daily);
    }).catch(function(error) {
      console.log(error)
    });
  }

  function populateCurrentWeatherCondition(response) {
    console.log("Weather summary: " + response.summary);
    var weatherText = response.summary;
    var temperatureValue = Math.round(response.temperature);
    var node = document.createElement("div");
    node.setAttribute("class", "col-8");

    var innerDiv1 = document.createElement("div");
    innerDiv1.setAttribute("class", "weather-type");
    innerDiv1.innerHTML = weatherText;
    node.appendChild(innerDiv1);

    var span = document.createElement("span");
    span.setAttribute("class", "number");
    span.innerHTML = temperatureValue + "&deg;<span class=\"unit\">F</span>"
    node.appendChild(span);

    document.getElementById("currentWeather").appendChild(node);

    var node1 = document.createElement("div");
    node1.setAttribute("class", "col-4");

    var innerDiv2 = document.createElement("div");
    innerDiv2.setAttribute("class", "weather-icon-current");
    innerDiv2.setAttribute("width", "84");
    innerDiv2.setAttribute("height", "84");
    node1.appendChild(innerDiv2);

    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", "assets/icons/" + response.icon + ".svg");
    iconImg.setAttribute("title", response.summary);
    innerDiv2.appendChild(iconImg);

    document.getElementById("currentWeather").appendChild(node1);
  }

  function getDayOfTheWeek(today) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[today.getDay()];
    return day;
  }

  function populate5DaysWeatherForecast(response) {
    for (var i = 0; i < 5; i++) {
      var Maximum = Math.round(response.data[i].temperatureHigh);
      var Minimum = Math.round(response.data[i].temperatureLow);
      var weatherDate = response.data[i].time;

      // console.log("Maximum: " + Maximum);
      // console.log("Minimum: " + Minimum);
      // console.log("Weather Date: " + weatherDate);

      var node = document.createElement("div");
      node.setAttribute("class", "col");

      var outerSpan = document.createElement("span");
      outerSpan.setAttribute("class", "day");
      var date = new Date(weatherDate * 1000);

      var getTodaysDate = new Date();
      var dayOfTheWeek = getDayOfTheWeek(date);
      var res = "";

      if (date.getDate() === getTodaysDate.getDate()) {
        res = "Today";
      } else {
        res = dayOfTheWeek.substring(0, 3);
      }
      outerSpan.innerHTML = res;
      node.appendChild(outerSpan);

      var innerDiv1 = document.createElement("div");
      innerDiv1.setAttribute("class", "weather-icon-forecast");
      innerDiv1.setAttribute("width", "39");
      innerDiv1.setAttribute("height", "39");
      node.appendChild(innerDiv1);

      var iconImg = document.createElement("img");
      iconImg.setAttribute("src", "assets/icons/" + response.data[i].icon + ".svg");
      iconImg.setAttribute("width", "39");
      iconImg.setAttribute("height", "39");
      iconImg.setAttribute("title", response.data[i].summary);
      innerDiv1.appendChild(iconImg);


      var innerDiv2 = document.createElement("div");
      innerDiv2.setAttribute("class", "high-low");

      var spanMax = document.createElement("span");
      spanMax.setAttribute("class", "high")
      spanMax.innerHTML = Maximum + "&deg;F";
      innerDiv2.appendChild(spanMax);

      var breakLine = document.createElement("br");
      innerDiv2.appendChild(breakLine);

      var spanMin = document.createElement("span");
      spanMin.setAttribute("class", "low")
      spanMin.innerHTML = Minimum + "&deg;F";
      innerDiv2.appendChild(spanMin);

      node.appendChild(innerDiv2);
      // console.log(node);

      document.getElementById("weatherForecast").appendChild(node);
    }
  }
});
