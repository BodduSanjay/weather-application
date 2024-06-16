import React, { useState, useContext } from 'react';
import {RotatingTriangles} from 'react-loader-spinner';
import themeContext from '../../context/themeContext';
import ButtonItem from '../ButtonItem'
import { HomeContainer, SearchInput, SearchButton, FailureH1, FailurePara } from './styledComponents';
import './index.css';

const apiStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
};

const cityButtons = [
  {
    id: 0,
    text: "Delhi"
  },
  {
    id: 1,
    text: "New York"
  },
  {
    id: 2,
    text: "Paris"
  },
  {
    id: 3,
    text: "Sydney"
  },
  {
    id: 4,
    text: "Tokyo"
  },
  {
    id: 5,
    text: "Landon"
  },
  {
    id: 6,
    text: "Hyderabad"
  }
]

const Home = () => {
  const [place, setPlace] = useState('');
  const [activeId, setActiveId] = useState('')
  const [weatherData, setWeatherData] = useState(null);
  const [currentApiStatus, setApiStatus] = useState(apiStatus.initial);
  const { isLight } = useContext(themeContext);

  const handleInput = (event) => {
    setPlace(event.target.value);
  };

  const handleButtonClick = (id, text) => {
    setActiveId(id);
    setPlace(text);
    fetchWeatherData(text);
  }

  const fetchWeatherData = async (location) => {
    setApiStatus(apiStatus.inProgress);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=07c47928a5a4fcd726de2d1c98e7f985`
    );
    const data = await response.json();

    if (response.ok) {
        setWeatherData(data);
        setPlace('');
        setApiStatus(apiStatus.success);
    } else {
        setApiStatus(apiStatus.failure);
    }
  };

  const handleSearch = () => {
    if(place !== ""){
        fetchWeatherData(place)
        setActiveId("")
    }
  }

  const renderLoader = () => (
    <div className="loader-container">
      <RotatingTriangles type="ThreeDots" color="blue" height={150} width={150} />
    </div>
  );

  const renderSuccess = () => (
    <div className="temp-card">
      <p className="location-text">Weather in {weatherData.name}<br/><span className="date-time-text">{new Date().toLocaleString()}</span></p>
      <div className="tem-container">
        <div className='temp-image-container'>
            <p className="temparature-text">
                {Math.round(weatherData.main.temp - 273.15)}°C
                <br/>
                <span className='date-time-text'>{weatherData.weather[0].description}</span>
            </p>
            <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="weather-icon"
            />
        </div>
        <div className='min-max-tamp-container'>
            <p className='min-para'>Low: {Math.round(weatherData.main.temp_min - 273.15)}°</p>
            <p className='min-para'>High: {Math.round(weatherData.main.temp_max - 273.15)}°</p>
        </div>            
      </div>
      <div className="additional-details-container">
        <p className="humidity-text">
          Humidity <br /> {weatherData.main.humidity}%
        </p>
        <p className="humidity-text">
          Pressure <br /> {weatherData.main.pressure} hPa
        </p>
        <p className="humidity-text">
          Wind Speed <br /> {weatherData.wind.speed} m/s
        </p>
      </div>
    </div>
  );

  const renderFailure = () => (
    <div>
        <img className='failure-image' src='https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715317832/f4easioy7gnasaywlcal.png' alt="wrong location"/>
        <FailureH1 isLight={isLight}>Opss...! Invalid Place Name</FailureH1>
        <FailurePara isLight={isLight}>Enter a valid place.</FailurePara>
    </div>
  );

  const fetchNoLocation = () => (
    <div>
        <img src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715236483/ah2nqxr7wxwmefitbzmj.png" alt='Empty Location' className='failure-image'/>
        <FailureH1 isLight={isLight}>Empty Location...!</FailureH1>
        <FailurePara isLight={isLight}>Search a location to get the weather info.</FailurePara>
    </div>
  );

  const renderAll = () => {
    switch(currentApiStatus) {
      case apiStatus.initial:
        return fetchNoLocation();
      case apiStatus.inProgress:
        return renderLoader();
      case apiStatus.success:
        return renderSuccess();
      case apiStatus.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <HomeContainer isLight={isLight}>
      <div className="input-container">
        <SearchInput
          isLight={isLight}
          type="text"
          value={place}
          placeholder="Enter City Name..."
          onChange={handleInput}
        />
        <SearchButton
          isLight={isLight}
          type="button"
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </SearchButton>
      </div>
      {renderAll()}
      <div className='button-text-cont'>
        <h1 className='heading-cities'>Know Weather By <br/> One Click.</h1>
        <p className='explaination-para'>Imagine being able to check the weather of famous cities around the world with just one click. Whether you’re planning a trip or just curious about the weather conditions in places like New York, Paris, Tokyo, or Sydney, this feature has you covered. No more endless searching or switching between different websites. With this tool, you get instant access to real-time weather updates for multiple cities at your fingertips. Stay informed and make better travel plans with ease. This one-click weather check ensures you’re always prepared, no matter where your curiosity takes you.</p>
        <ul className='buttons-container'>
          {
            cityButtons.map(btn => {
              return <ButtonItem key={btn.id} btn={btn} handleButtonClick={handleButtonClick} isActive={btn.id === activeId}/>
            })
          }
        </ul>
      </div>
      <div className='weather-explian-container'>
        <h1>Weather</h1>
        <p className='about-me-para'>
          Weather is the state of the atmosphere, describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or cloudy.[1] On Earth, most weather phenomena occur in the lowest layer of the planet's atmosphere, the troposphere,[2][3] just below the stratosphere. Weather refers to day-to-day temperature, precipitation, and other atmospheric conditions, whereas climate is the term for the averaging of atmospheric conditions over longer periods of time.[4] When used without qualification, "weather" is generally understood to mean the weather of Earth. <br/>
          <br />
          Weather is driven by air pressure, temperature, and moisture differences between one place and another. These differences can occur due to the Sun's angle at any particular spot, which varies with latitude. The strong temperature contrast between polar and tropical air gives rise to the largest scale atmospheric circulations: the Hadley cell, the Ferrel cell, the polar cell, and the jet stream. Weather systems in the middle latitudes, such as extratropical cyclones, are caused by instabilities of the jet streamflow. Because Earth's axis is tilted relative to its orbital plane (called the ecliptic), sunlight is incident at different angles at different times of the year. On Earth's surface, temperatures usually range ±40 °C (−40 °F to 104 °F) annually. Over thousands of years, changes in Earth's orbit can affect the amount and distribution of solar energy received by Earth, thus influencing long-term climate and global climate change.
          <a href='https://en.wikipedia.org/wiki/Weather' rel="noopener noreferrer" target='_blank' className='link-weki'>Know more...</a>
       </p>
      </div>
      <div className='about-me-container'>
          <div className='profile-cont'>
            <img src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1718515889/Snapchat-1124405091_r3xcd3.jpg" alt='profile' className='profile-image'/>
            <h3 className='profession-heading'>Frontend Developer</h3>
          </div>
          <p className='about-me-para'>
            I am a certified Front-End Developer with a passion for creating high-quality websites for businesses. Equipped with industry-ready skills, I specialize in developing comprehensive solutions tailored to meet unique business needs. <br />  
            With a strong foundation in front-end technologies, I excel in crafting visually appealing, user-friendly, and responsive websites. My expertise in HTML, CSS, JavaScript, and modern frameworks like Vue.js ensures a seamless and efficient web experience that drives results.
          </p>
          <div>
            <h2>Other Project's:</h2>
            <a href='https://nwtwatchsanju.ccbp.tech' rel="noopener noreferrer" target='_blank'>1. Nxt Watch...  {' =>'}</a>
            <p>username: rahul, <br/>password: rahul@2021</p>
            <hr />
            <a href='https://sanjushopz.ccbp.tech' rel="noopener noreferrer" target='_blank'>2. Nxt Trendz... {' =>'}</a>
            <p>username: rahul, <br/>password: rahul@2021</p>
            <hr />
            <a href='https://jobbywebappzs.ccbp.tech' rel="noopener noreferrer" target='_blank'>3. Jobby App... {' =>'}</a>
            <p>username: rahul, <br/>password: rahul@2021</p>
          </div>
      </div>
    </HomeContainer>
  );
};

export default Home;
