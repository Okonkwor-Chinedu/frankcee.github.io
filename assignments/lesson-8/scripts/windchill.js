function calwindchill() {
    let t = parseInt(document.getElementById('currentTemp').innerHTML);
    let s = parseInt(document.getElementById('windspeed').innerHTML);
    let windchill =35.74+0.6215*t-35.75*(Math.pow(s,0.16))+0.4275*t*(Math.pow(s,0.16));
    document.getElementById("windchill").innerHTML = windchill;
    }
    