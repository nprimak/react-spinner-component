import './App.css';
import Spinner from '../Spinner/Spinner';
import {useState} from 'react';

function App() {
  const [pauseSpinner, setPauseSpinner] = useState(true);
  const fileSize = 1000; //change this int to adjust how long the simulated transfer takes  

  return (
    <div className="App">
      <Spinner pauseSpinner={pauseSpinner} fileSize={fileSize}></Spinner>
      {pauseSpinner ? 
        <button onClick={() => setPauseSpinner(false)}>Start</button> :
        <button onClick={() => setPauseSpinner(true)}>Pause</button>
      }      
    </div>
  );
}

export default App;
