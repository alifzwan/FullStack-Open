import React, {useState, useEffect} from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import Country from './components/Country'

// 2.18* Data for countries, step 1
// 2.19*: Data for countries, step 2


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')


  useEffect(() => {
    countriesService.getAll()
      .then(data => {
        setCountries(data)
        console.log(data)
      })
  }, [])
  
  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const filteredCountries = Array.isArray(countries) ? countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase())) : []


  return (
    <div>
      <Filter value={searchCountry} onChange={handleSearchChange}/>
      {
        // if there are more than 10 countries that match the search, the user is asked to make the search more specific
        filteredCountries.length > 10 ? 
            <p>Too many matches, please make your query more specific.</p> 
        : 
        // if there are 2-10 countries that match the search, the names of the countries are displayed
        filteredCountries.length > 1 ? 
            filteredCountries.map((country) => ( //
              <p key={country.cca3}>{country.name.common}</p> 
            ))
        :
        // if there is only one country that matches the search, detailed information about the country is displayed
        filteredCountries.length === 1 ? 
            <Country countries={filteredCountries} />
        : 
        null
      }
    </div>
  )
}

export default App