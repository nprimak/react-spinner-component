import './App.css';
import Spinner from '../Spinner/Spinner';
import {useState} from 'react';

function App() {
  const [pauseSpinner, setPauseSpinner] = useState(true);
  const fileSize = 1000; //change this int to simulate transfer of larger files
  const transferAmountPerSecond = 20 //change this int to simuluate faster transfer speed

  return (
    <div className="App">
      <Spinner pauseSpinner={pauseSpinner} fileSize={fileSize} transferAmountPerSecond={transferAmountPerSecond}></Spinner>
      {pauseSpinner ? 
        <button data-cy="start" onClick={() => setPauseSpinner(false)}>Start</button> :
        <button data-cy="end" onClick={() => setPauseSpinner(true)}>Pause</button>
      }      
    </div>
  );
}

export default App;
