import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // const currentDate = new Date();
  const [city, setCity] = useState("Kerala");
  const [weatherData, setWeatherData] = useState(null);

  // const months = [
  //   "January","February","March","April","May","June",
  //   "July","August","September","October","November","December"
  // ];
  // const month = months[currentDate.getMonth()];
  // const day = currentDate.getDate();
  // const year = currentDate.getFullYear();
  // // const formattedDate = `${day} / ${month} / ${year}`;
  const API_key = "4be68f64bb757ea120c7f973ccc88e8c";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return process.env.PUBLIC_URL + "/Cloud.gif";
      case "Rain":
        return process.env.PUBLIC_URL + "/Rain.gif";
      case "Mist":
        return process.env.PUBLIC_URL + "/Mist.gif";
      case "Haze":
        return process.env.PUBLIC_URL + "/Haze.gif";
      case "Clear":
        return process.env.PUBLIC_URL + "/sunny.gif";
      default:
        return process.env.PUBLIC_URL + "/Cloud.gif"; 
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  
  const backgroundStyle = weatherData
    ? { backgroundImage: `url(${getWeatherIconUrl(weatherData.weather[0].main)})` }
    : {};

  return (
    <div className="App" style={backgroundStyle}>
      <div className="overlay">
        {weatherData && (
          <>
            {/* <h1 className="container_date">{formattedDate}</h1> */}
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              
              <h2 className="container_degree">
                {(weatherData.main.temp - 273.15).toFixed(2)}°C
              </h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>
               <div className="extra_info">
              <p>🌡 Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
              <p>💧 Humidity: {weatherData.main.humidity}%</p>
              <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>📊 Pressure: {weatherData.main.pressure} hPa</p>
              <p>🌅 Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p>🌇 Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
  </div>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter the city Name"
                  onChange={handleInputChange}
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;




