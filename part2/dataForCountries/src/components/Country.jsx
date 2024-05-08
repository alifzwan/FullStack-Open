import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Country = ({ countries }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}
      &appid=a8569fbc6afcb2ffd5ecb5884c67f8e4`)
      setWeather(response.data)
    }
    getWeather()
  }, [countries])

  return (
    <div>
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <img src={countries[0].flags.svg} alt={`Flag of ${countries[0].name.common}`} />
          <h3>Languages</h3>
          <ul>
            {Object.values(countries[0].languages).map((language, index) => 
              <li key={index}>{language}</li>
            )}
          </ul>
          <h2>Weather in {countries[0].capital}</h2>
          {weather && (
            <div>
              <p><strong>Temperature:</strong>{weather.main.temp} °C</p>
              <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
    </div>
  )
}

export default Country