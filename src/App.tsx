import './App.css';
import Frame from './components/Frame';
import Search from './components/Search';
import { useState } from "react"

function App() {
  const emptyLocationCoords = { lat: '', lon: '' };

  const [locationCoords, setCoords] = useState(emptyLocationCoords);

  return (
    <>
      <header className="App-header">
        <div className='row'>
          <div className='col-2'>
            <p>
              Weather App
            </p>
          </div>
          <div className='col-2'>
            <Search
              locationCoords={locationCoords}
              setCoords={setCoords}
            />
          </div>
        </div>
      </header>

      {locationCoords !== emptyLocationCoords &&
        <Frame locationCoords={locationCoords} />
      }
    </>
  );
}

export default App;
