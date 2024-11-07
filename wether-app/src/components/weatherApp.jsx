import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const WeatherApp = () => {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState()
  const ref = useRef(null)

  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71a222a60e88e62b1eb3f417364dc3ec&units=metric`

  const getFetchWeather = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setWeather(response.data)
    } catch (erro) {
      console.log('get error', erro)
    }
    setCity("")
  }

  const getData = () => {
    getFetchWeather()
    
  }

  const getLocation =()=>{    
    navigator.geolocation.getCurrentPosition(position)
  }

const position = async (val)=>{
  if(val.coords.latitude == 28.6294016 || val.coords.longitude == 77.0080768){
    console.log('delhi')
    setCity("delhi")
  }
 else{
  console.log('nahi aaya')
 }
}

useEffect(()=>{
  getLocation()
  setTimeout(() => {
    ref.current.click()
  }, 500);
},[])
  
  return (
    <div className='weather-container container-fluid'>
      <div className='container'>
        <div className="row">
          <div className="app-bg">
            <h3 className='h5'>Check weather for cities</h3>
            <input type='text' value={city} className="form-control" onChange={(e) => setCity(event.target.value)} />
            {weather &&
              <>
                <p className='mt-2 fw-bold fs-3'>{weather.name}</p>
                <div className="weatherCity fs-3">{weather.main.temp} &#8451; </div>
                <div className='image'>{<img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />}</div>
                <div className="typeOfWeather">{weather.weather[0].description}</div>
              </>

            }

            <button type="button" 
            className="btn btn-outline-primary mt-3" 
            onClick={() => getData()}
            ref={ref}
            >Get Weather</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
