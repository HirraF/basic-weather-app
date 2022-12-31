import './App.css';
import Frame from './components/Frame';
import Search from './components/Search';
import { useEffect, useState } from "react"

function App() {
  
  const [location, setLocation] = useState('');
  
  return (
    <>
      <header className="App-header">
        <p>
          Weather App
        </p>
        <Search
          location={location}
          setLocation={setLocation}
        />
      </header>
      <div className='App'>
        <Frame />
        <p>{location}</p>
      </div>
    </>
  );
}

export default App;
