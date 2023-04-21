import './App.css';
import { useState } from 'react';

const api = {
  base: "https://geocode.maps.co/search?",
};

const url = {
  base: "https://archive-api.open-meteo.com/v1/archive?",
};

function App() {

const [search, setSearch] = useState("");
const [weather, setWeather] = useState({});
const [meteo, setMeteo] = useState({});



const searchPressed = () => {
  fetch(`${api.base}q=${search}`)
  .then(res => res.json())
  .then(result => {
    console.log(result);
    setWeather(result);
  });
};

const rechercheMeteo = () => {
  fetch(`${url.base}latitude=${weather[0].lat}&longitude=${weather[0].lon}&start_date=2023-01-01&end_date=2023-04-20&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`)
  .then(res1 => res1.json())
  .then(resultat => {
    console.log(resultat);
    setMeteo(resultat);
  });
};
 
return (
  <div className="App">
    <header className="App-header">
      {/* HEADER */}
     <h1>Weather App 2</h1>

      {/* Search Box */} 
     <div>
      <input 
        type="text" 
        placeholder="Entrez une ville"
        onChange={(e) => setSearch(e.target.value)}
        />
      <button onClick={searchPressed}>Search</button>
      </div>

{/* If weather is not undefined */}
{typeof weather[0] !== "undefined" ? (
<div>
      {/* Location */}
      <p>Latitude : {weather[0].lat}</p>

      {/* Temperature */} 
      <p>Longitude : {weather[0].lon}</p>
      
      </div>
) : (
""
)}
   
{/* Search Box */} 
<div>
      <button onClick={rechercheMeteo}>Lancer la recherche</button>
</div>
<div><p>Altitude{meteo.elevation}</p></div>

    </header>
  </div>
);
}

export default App;
