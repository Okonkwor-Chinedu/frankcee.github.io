

//Weather Summary
var weatherObject = new XMLHttpRequest
weatherObject.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=5585010&appid=1b85c554f737909311537328716a5d15&units=imperial', true);
weatherObject.send();
weatherObject.onload = function () {

    var weatherInfo = JSON.parse(weatherObject.responseText);
    console.log(weatherInfo);

    document.getElementById('weatherDesc').innerHTML = weatherInfo.weather[0].description;
    document.getElementById('currentTemp').innerHTML = weatherInfo.main.temp;
    document.getElementById('humidity').innerHTML = weatherInfo.main.humidity;
    document.getElementById('windSpeed').innerHTML = weatherInfo.wind.speed;

    var degree = weatherInfo.wind.deg; 
    var compass = Math.round((degree - 11.25) / 22.5); 
   
    var windNames = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    var direction = windNames[compass]; 
    document.getElementById('windDegree').innerHTML = Math.round(degree) + '&deg;' + " ";
    document.getElementById('windDir').innerHTML = direction;

    //windchill
    var windChill = 35.74 + 0.6215 * weatherInfo.main.temp - 35.75 * Math.pow(weatherInfo.wind.speed, 0.16) + 0.4275 * weatherInfo.main.temp * Math.pow(weatherInfo.wind.speed, 0.16);
    windChill = Math.round(windChill);
    document.getElementById("windChill").innerHTML = windChill;
}
var section = document.getElementById("events");
            var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
            var request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();

            request.onload = function() {
            var eventdetails = request.response;
            populate(eventdetails);
            

            function populate(eventdetails) {
                var townevents = eventdetails['towns'];
                for (var i = 0; i < townevents.length; i++ ) {
                    if (townevents[i].name === 'Preston') {
                        var article = document.createElement("article");
                        var list = document.createElement("ul");
                        var towneventlist = townevents[i].events;

                        for (var x = 0; x < towneventlist.length; x++) {
                            var listItem = document.createElement("li");
                            listItem.textContent = towneventlist[x];
                            list.appendChild(listItem);
                        }

                        article.appendChild(list);
                        section.appendChild(article);
                    }
                }
            }
            }
            

//Five Days Weather Forecast
var weatherForecast = new XMLHttpRequest
weatherForecast.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=5585010&appid=1b85c554f737909311537328716a5d15&units=imperial', true);
weatherForecast.send();
weatherForecast.onload = function () {

    var weatherInfo = JSON.parse(weatherForecast.responseText);
    console.log(weatherInfo);

    var listDate = [];
    var listTemp = [];
    var listIconCode = [];

    for (i = 0; i < weatherInfo.list.length; ++i) {
        time = weatherInfo.list[i].dt_txt;
        if (time.includes("18:00:00")) {

            var date = new Date(weatherInfo.list[i].dt * 1000);
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            var findDate = weekday[date.getDay()] + '<br>' + month[date.getMonth()] + ' ' + date.getDate();
            listDate.push(findDate);

            var temp = weatherInfo.list[i].main.temp_max;
            var temp = Math.round(temp);
            listTemp.push(temp);

            var iconcode = weatherInfo.list[i].weather["0"].icon;
            var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
            listIconCode.push(icon_path);
        }
        continue;
    }
    document.getElementById('day1').innerHTML = listDate[0];
    document.getElementById('day2').innerHTML = listDate[1];
    document.getElementById('day3').innerHTML = listDate[2];
    document.getElementById('day4').innerHTML = listDate[3];
    document.getElementById('day5').innerHTML = listDate[4];
    
    document.getElementById('weather_icon1').src = listIconCode[0];
    document.getElementById('weather_icon2').src = listIconCode[1];
    document.getElementById('weather_icon3').src = listIconCode[2];
    document.getElementById('weather_icon4').src = listIconCode[3];
    document.getElementById('weather_icon5').src = listIconCode[4];
    
    document.getElementById("highTemp1").innerHTML = listTemp[0];
    document.getElementById("highTemp2").innerHTML = listTemp[1];
    document.getElementById("highTemp3").innerHTML = listTemp[2];
    document.getElementById("highTemp4").innerHTML = listTemp[3];
    document.getElementById("highTemp5").innerHTML = listTemp[4];

} 
var aside = document.querySelector('aside');
var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var townData = request.response;
    showData(townData);
}
function showData(jsonObj) {
    var data = jsonObj['towns'];
    for (var i = 0; i < data.length; i++) {
        var name = data[i].name;
        if ((name.includes("Fish Haven")) == false) {
            continue;
        }
        var myDiv = document.createElement('div');
        var myList = document.createElement('ul');
        var townEvents = data[i].events;
        for (var j = 0; j < townEvents.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = townEvents[j];
            myList.appendChild(listItem);
        }
        myDiv.appendChild(myList);
        aside.appendChild(myDiv);
    }
}