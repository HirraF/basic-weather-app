import './App.css';
import Frame from './components/Frame';
import Search from './components/Search';
import { useState } from "react"

function App() {

  const [location, setLocation] = useState('');

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
              location={location}
              setLocation={setLocation}
            />
          </div>
        </div>
      </header>

      <Frame />
      {/* <p>{location}</p> */}

    </>
  );
}

export default App;
