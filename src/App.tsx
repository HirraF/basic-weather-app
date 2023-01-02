import './App.css';
import Frame from './components/Frame';
import Search from './components/Search';
import { useState } from "react"

function App() {
  const emptyLocationCoords = { lat: '', lon: '' };

  const [locationCoords, setCoords] = useState(emptyLocationCoords);

  return (
    <div className='App'>
      <header className="App-header">
        <div id='logo'>
          <p>
            Weather App
          </p>
        </div>
        <div>
            <Search
              locationCoords={locationCoords}
              setCoords={setCoords}
            />
        </div>

      </header>

      {locationCoords !== emptyLocationCoords &&
        <Frame locationCoords={locationCoords} />
      }
    </div>
  );
}

export default App;
