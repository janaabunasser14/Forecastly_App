

const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found'); //if the user search about city does not exist
const citiHide = document.querySelector('.city-hide');

search.addEventListener('click',()=>{
    const APIKey='cff4e768acad24a67eb41c1af9047d04';
    const city = document.querySelector('.search-bar input').value; //getting the name of the city user entered
    if (city == '') // if the user did not enter a city
        return;
      //get api
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{

    //if the city user search does not exist
  
    if(json.cod=='404'){
      citiHide.textContent= city;
      container.style.height = '400px';
      weatherBox.classList.remove('active');
      weatherDetails.classList.remove('active');
      error404.classList.add('active');
      return;
    }
    

        const image = document.querySelector('.weather-box img');
        const tempr = document.querySelector('.weather-box .temprature');
        const desc = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');


        if(citiHide.textContent == city){
          return;
        }
        else{
          citiHide.textContent = city;
          container.style.height = '500px';
          container.classList.add('active');
          weatherBox.classList.add('active');
          weatherDetails.classList.add('active');
          error404.classList.remove('active');

          setTimeout(()=>{
            container.classList.remove('active');
          },2500);
          
          // the weather satates
        switch(json.weather[0].main){
          case 'Clear': 
            image.src = 'assets/clear.png';
            break;

          case 'Rain': 
            image.src = 'assets/rain.png';
            break;

          case 'Snow': 
            image.src = 'assets/snow.png';
            break;

          case 'Clouds': 
            image.src = 'assets/cloud.png';
            break;

          case 'Mist': 
            image.src = 'assets/mist.png';
            break;


          case 'Haza': 
            image.src = 'assets/mist.png';
            break;


          default:
              image.src = 'assets/cloud.png';
      }

      tempr.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
      desc.innerHTML=`${json.weather[0].description}`;
      humidity.innerHTML= `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      const infoWeather = document.querySelector('.info-weather');
      const infoHumidity = document.querySelector('.info-humidity');
      const infoWind = document.querySelector('.info-wind');

      const elCloneInfoWeather = infoWeather.cloneNode(true);
      const elCloneInfoHumidity = infoHumidity.cloneNode(true);
      const elCloneInfoWind = infoWind.cloneNode(true);

      elCloneInfoWeather.id = 'clone-info-weather';
      elCloneInfoWeather.classList.add('active-clone');

      elCloneInfoHumidity.id = 'clone-info-humidity';
      elCloneInfoHumidity.classList.add('active-clone');

      elCloneInfoWind.id = 'clone-info-wind';
      elCloneInfoWind.classList.add('active-clone');

      setTimeout(()=>{
        infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
        infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
        infoWind.insertAdjacentElement("afterend",elCloneInfoWind);

      }, 2200);

      const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
      const totalCloneInfoWeather = cloneInfoWeather.length;
      const cloneInfoWeatherFirst = cloneInfoWeather[0];

      const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
      const cloneInfoHumidityFirst = cloneInfoHumidity[0];
      
      const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
      const cloneInfoWindFirst = cloneInfoWind[0];

      if(totalCloneInfoWeather > 0){
        cloneInfoWeatherFirst.classList.remove('active-clone');
        cloneInfoHumidityFirst.classList.remove('active-clone');
        cloneInfoWindFirst.classList.remove('active-clone');

        setTimeout(()=>{
  
          cloneInfoWeatherFirst.remove();
          cloneInfoHumidityFirst.remove();
          cloneInfoWindFirst.remove();
        }, 2200);
      }
        }


    });
});


