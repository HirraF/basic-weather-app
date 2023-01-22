import './App.css';
import Frame from './components/Frame';
import Search from './components/Search';
import { useState } from "react"

function App() {
  const emptyLocationCoords = { lat: '', lon: '' };

  const [locationCoords, setCoords] = useState(emptyLocationCoords);

  return (
    <div className='App'>
      <header className="AppHeader">
        <div id='logo'>
          <p>
            Weather App
          </p>
        </div>
            <Search
              locationCoords={locationCoords}
              setCoords={setCoords}
            />

      </header>

      {locationCoords !== emptyLocationCoords &&
        <Frame locationCoords={locationCoords} />
      }
    </div>
  );
}

export default App;
