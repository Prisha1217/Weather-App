
const temp = document.querySelector(".temp");
const input= document.querySelector("input");
var city= document.querySelector(".city");
const windVal = document.querySelector(".wind-value")
const humidityVal = document.querySelector(".humidity-value")
const searchBtn= document.querySelector(".search-icon")
const img= document.querySelector(".weather-icon")

searchBtn.addEventListener('click', ()=>{
    checkWeather(input.value);
})


const URL="https://api.openweathermap.org/data/2.5/weather?&units=metric"
const APIkey="1add143fd9ed776ec351a375afdb855b";

async function checkWeather(city){
    if(city!='')
    {
        let finalURL= URL+`&appid=${APIkey}&q=${city}`
        const response= await fetch(finalURL);
        if(response.status=== 404)
        {
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }
        let data= await response.json();
        updateValue(data);
    }
}


function updateValue(data){
    windVal.innerHTML= Math.round(data.wind.speed)+` km/hr`;
    let place= input.value;
    place_= place.slice(1 , place.length)
    city.textContent= place[0].toUpperCase()+place_;
    temp.textContent= Math.round(data.main.temp)+"°C";
    humidityVal.textContent= data.main.humidity+"%";
    console.log(data); 

    if(data.weather[0].main=== "Clouds"){
        img.src= "./images/clouds.png";
    }
    else if(data.weather[0].main=== "Rain" || data.weather[0].main=== "Thunderstorm"){
        img.src= "./images/rain.png";
    }
    else if(data.weather[0].main=== "Snow"){
        img.src= "./images/snow.png";
    }
    else if(data.weather[0].main=== "Drizzle"){
        img.src= "./images/drizzle.png";
    }
    else if(data.weather[0].main=== "Mist"){
        img.src= "./images/mist.png";
    }
    else if(data.weather[0].main=== "Clear"){
        img.src= "./images/clear.png";
    }
    else{
        img.src= "./images/clear.png";
    }
    document.querySelector(".error").style.display="none";
    document.querySelector(".weather").style.display="block";
}
