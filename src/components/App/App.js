import './App.css';
import Spinner from '../Spinner/Spinner';
import {useState} from 'react';

function App() {
  const [pauseSpinner, setPauseSpinner] = useState(false); 

  return (
    <div className="App">
      <Spinner pauseSpinner={pauseSpinner}></Spinner>
      <button onClick={() => setPauseSpinner(false)}>Start</button>
      <button onClick={() => setPauseSpinner(true)}>End</button>
    </div>
  );
}

export default App;
