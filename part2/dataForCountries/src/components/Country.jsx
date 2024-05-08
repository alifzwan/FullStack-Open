import React from 'react'

const Country = ({ countries }) => {
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
          </div>
    </div>
  )
}

export default Country