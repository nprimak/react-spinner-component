import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="spinner">
        <div class="circle">
          <svg width="84" height="84" class="circle__svg">
            <circle cx="41" cy="41" r="38" class="circle__progress circle__progress--path"></circle>
            <circle cx="41" cy="41" r="38" class="circle__progress circle__progress--fill"></circle>
          </svg>

          <div class="percent">
            <span class="percent__int">0</span>
          </div>
        </div>

        <span class="label">Transparent</span>
      </div>
    </div>
  );
}

export default App;
