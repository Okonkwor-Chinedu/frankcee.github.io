var main = document.querySelector('main');
var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var townInfo = request.response;
  showInfo(townInfo);
}

function showInfo(jsonObj) {
  var info = jsonObj['towns'];

  for (var i = 0; i < info.length; i++) {
    if (i === 0 || i === 2 || i === 3 || i === 6) {
      continue;
    }
    var myArticle = document.createElement('div');
    var myName = document.createElement('h5');
    var myMotto = document.createElement('em');
    var myYear = document.createElement('p');
    var myPopulation = document.createElement('p');
    var myRain = document.createElement('p');
    var myPic = document.createElement('img');

    myName.textContent = info[i].name;
    myMotto.textContent = info[i].motto;
    myYear.textContent = 'Year Founded: ' + info[i].yearFounded;
    myPopulation.textContent = 'Current Population: ' + info[i].currentPopulation;
    myRain.textContent = 'Average Rainfall: ' + info[i].averageRainfall;

    myArticle.appendChild(myName);
    myArticle.appendChild(myMotto);
    myArticle.appendChild(myYear);
    myArticle.appendChild(myPopulation);
    myArticle.appendChild(myRain);
    myArticle.appendChild(myPic);

    if (i === 1)
      myPic.src = 'images/hero-home.jpg'
      myPic.setAttribute('class', 'homepic1');
      myPic.setAttribute('alt', 'Fish Haven Image');
    if (i === 4)
      myPic.src = 'images/background-home.jpg'
      myPic.setAttribute('class', 'homepic2');
      myPic.setAttribute('alt', 'Preston Image');
    if (i === 5)
      myPic.src = 'images/mountain-home.jpg'
      myPic.setAttribute('class', 'homepic3');
      myPic.setAttribute('alt', 'Soda Springs Image');


      main.appendChild(myArticle);
  }
}