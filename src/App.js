import React, { useState, useEffect } from "react";
import "./App.css"; 

function App() {
  const [cityList, setCityList] = useState([]);
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(null); // State for highlighted row index
  const [error, setError] = useState(null); // State for error message
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const apiKey = "d2c40ae57c4ca1dc8e2138f904ffa10d";

  // Fetch weather data for a city
  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  // Fetch weather data for all cities in the city list
  const fetchWeatherForAllCities = async () => {
    const newDataList = [];
    try {
      for (const cityName of cityList) {
        const weatherData = await fetchWeather(cityName);
        if (weatherData) {
          newDataList.push({ cityName, weatherData });
        }
      }
      setWeatherDataList(newDataList);
      setError(""); 
    } catch (error) {
      setError("Failed to fetch weather data. Please try again later."); // Set error message
    }
  };

  //on  button click  Handle Get Weather
  const handleGetWeather = async () => {
    try {
      await fetchWeatherForAllCities();
      setError("");
    } catch (error) {
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  // Handle "Add City" button click
  const handleAddCity = async () => {
    if (newCity.trim() !== "") {
      try {
        const weatherData = await fetchWeather(newCity.trim());
        if (weatherData) {
          setCityList((prevCityList) => [...prevCityList, newCity.trim()]);
          setNewCity("");
          setError("");
        } else {
          setError(
            "Failed to fetch weather data for the city. Please try again later."
          );
        }
      } catch (error) {
        setError(
          "Failed to fetch weather data for the city. Please try again later."
        );
      }
    }
  };

  // Handle "Search" button click
  const handleSearch = () => {
    const matchedIndex = weatherDataList.findIndex(
      (data) => data.cityName.toLowerCase() === searchTerm.toLowerCase()
    );
    
    setHighlightedRowIndex(matchedIndex); 
  }


  // Handle delete button click in details table
  const handleDelete = (index) => {
    setWeatherDataList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  // style data for when we search for city
  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      setHighlightedRowIndex(null); // Remove highlight
    }, 2000);
   
    return () => clearTimeout(timeoutId);
  }, [highlightedRowIndex]);

  // Apply dark mode styles when isDarkMode changes
  useEffect(() => {
    
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      <header>
        <p>Mansi's Weather App</p>
        <div className="toggle-dark-mode">
          <button onClick={() => setIsDarkMode((prevMode) => !prevMode)}>
            <svg display="none">
              <symbol id="light" viewBox="0 0 24 24">
                <g
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(0,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(45,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(90,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(135,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(180,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(225,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(270,12,12)"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="20"
                    transform="rotate(315,12,12)"
                  />
                </g>
                <circle fill="currentColor" cx="12" cy="12" r="5" />
              </symbol>
              <symbol id="dark" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.1,14.9c-3-0.5-5.5-3-6-6C8.8,7.1,9.1,5.4,9.9,4c0.4-0.8-0.4-1.7-1.2-1.4C4.6,4,1.8,7.9,2,12.5c0.2,5.1,4.4,9.3,9.5,9.5c4.5,0.2,8.5-2.6,9.9-6.6c0.3-0.8-0.6-1.7-1.4-1.2C18.6,14.9,16.9,15.2,15.1,14.9z"
                />
              </symbol>
            </svg>
            <label class="switch">
              <input
                class="switch__input"
                type="checkbox"
                role="switch"
                name="dark"
              />
              <svg
                class="switch__icon"
                width="24px"
                height="24px"
                aria-hidden="true"
              >
                <use href="#light" />
              </svg>
              <svg
                class="switch__icon"
                width="24px"
                height="24px"
                aria-hidden="true"
              >
                <use href="#dark" />
              </svg>
              <span class="switch__inner"></span>
              <span class="switch__inner-icons">
                <svg
                  class="switch__icon"
                  width="24px"
                  height="24px"
                  aria-hidden="true"
                >
                  <use href="#light" />
                </svg>
                <svg
                  class="switch__icon"
                  width="24px"
                  height="24px"
                  aria-hidden="true"
                >
                  <use href="#dark" />
                </svg>
              </span>
              <span class="switch__sr">Dark Mode</span>
            </label>
          </button>
        </div>
      </header>
      <div className="App">
        <div className="city-list">
          <h1>City List</h1>
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Enter city"
            className="searchCityText"
          />
          <div className="citylist-buttons">
            <button onClick={handleAddCity}>Add City</button>
            <button onClick={handleGetWeather}>Get Weather</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {cityList.length > 0 ? (
                cityList.map((city, index) => (
                  <tr key={index}>
                    <td>{city}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
          {error && <p className="errorMessge">Please add proper city</p>}
        </div>
        <div className="details">
          <h1>Details</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <button onClick={handleSearch}>Search</button>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Description</th>
                <th>Temperature (°C)</th>
                <th>Pressure (hPa)</th>
                <th>Data Age (hours)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {weatherDataList.length > 0 ? (
                weatherDataList.map(({ cityName, weatherData }, index) => (
                  <tr
                    key={index}
                    className={
                      highlightedRowIndex === index ? "highlighted" : ""
                    }
                  >
                    <td>{cityName}</td>
                    <td>{weatherData.weather[0].description}</td>
                    <td>{weatherData.main.temp}</td>
                    <td>{weatherData.main.pressure}</td>
                    <td>
                      {Math.round(
                        (new Date().getTime() - weatherData.dt * 1000) /
                          (1000 * 60 * 60)
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(index)}
                        id="deleteBtn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
