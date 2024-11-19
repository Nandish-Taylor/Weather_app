import React, { useEffect, useRef, useState } from 'react'
import './WeatherApp.css'
import rain from '../assets/images/heavy-rain.png'
import storm from '../assets/images/storm.png'
import sun from '../assets/images/sun.png'
import few_clouds from '../assets/images/weather.png'
import snow from '../assets/images/snow.png'
import cloudy from '../assets/images/cloudy.png'
import fog from '../assets/images/fog.png'
import wind from '../assets/images/wind.png'
import searchImg from '../assets/images/search.png'
import humidity from '../assets/images/humidity.png'

const WeatherApp = () => {
  const inputRef = useRef();

  const[weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02n": few_clouds,
    "02d": few_clouds,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09n": rain,
    "09d": rain,
    "10d": rain,
    "10n": rain,
    "11d": storm,
    "11n": storm,
    "13d": snow,
    "13n": snow,
    "50d": fog,
    "50n": fog,
  }
  const description = {
    "01d": 'Sunny',
    "01n": 'Sunny',
    "02n": 'Perfect Cloudy',
    "02d": 'Perfect Cloudy',
    "03d": 'Cloudy',
    "03n": 'Cloudy',
    "04d": 'Cloudy',
    "04n": 'Cloudy',
    "09n": 'Rainy',
    "09d": 'Rainy',
    "10d": 'Rainy',
    "10n": 'Rainy',
    "11d": 'Storm',
    "11n": 'Storm',
    "13d": 'Snow',
    "13n": 'Snow',
    "50d": 'Fog',
    "50n": 'Fog',
  }

  const search= async(city) => {
    if(city === "")
    {
      alert("Enter City Name");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sun;
      const iconDescription = description[data.weather[0].icon] || 'Sunny';
      setWeatherData(
        {
          humidityData: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          description: iconDescription
        }
      )
    }
    catch(error){
      setWeatherData(false);
      console.error('Error fetching weather data:', error);
      alert("You might have entered an incorrect city name.")
    }
  }
  useEffect(()=>{
    search("surat");
  },[]);
  

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={searchImg} alt="image" className="img-size" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
      <div className="weatherName">{weatherData.description}</div>
      <p className='temp'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="" />
          <div>
            <p>{weatherData.humidityData} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
        <img src={wind} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div></>:<></>}
      
    </div>
  )
}

export default WeatherApp

