import humidity from "./img/Humidity.svg"
import searchimg from "./img/search.svg"
import wind from "./img/wind.svg"
import './App.css';
import { useState } from "react";
import Loader from "./components/loader/Loader";
import CustomError from "./components/custom-error/CustomError";
const API_KEY = "aa57a53f55a1f4baa176f8d5974fccfe"
function App() {
  const [search, setSearch] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  function getResponse() {
    setLoading(true)
    setError(null)
    setResponse(null)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
      .then((result) => result.json())
      .then((result) => {
        if(result.cod !== 200){
          throw new Error(result.message);
          
        }
        setResponse({
          temp:  Math.floor(result.main.temp),
          icon: result.weather[0].icon,
          name: result.name,
          humidity: result.main.humidity,
          wind: result.wind.speed,

        })
        setLoading(false)
      })
      .catch((result)=> {
        setError(result.message)
        setLoading(false)
      })
  }


  return (
    <div className="App">
      <div className="App__header">
        <input type="text" placeholder='SEARCH' value={search} onChange={(event) => setSearch(event.target.value)} />
        <button className="search" onClick={getResponse} disabled={loading}>
          <img src={searchimg} alt="search" />
        </button>
      </div>

      {loading ? <Loader /> : error? <CustomError message = {error}/> : response ? <div className="App__main">
        <img src={`https://openweathermap.org/img/wn/${response.icon}@4x.png`} alt="weather" className="weather" />
        <h1>{response.temp}°C</h1>
        <h2>{response.name}</h2>
      </div> : null}
      {response ? <div className="App__footer">
        <div className="info">
          <img src={humidity} alt="humidity" />
          <div className="humidity">
            <p className="info__number">{response.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="info">
          <img src={wind} alt="wind" />
          <div className="wind">
            <p className="info__number">{response.wind}m/s</p>
            <p>wind speed</p>
          </div>
        </div>
      </div> : null}

    </div>
  );
}

export default App;
