import './App.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  
  const [downloadAmount, setDownloadAmount] = useState(0);
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [circumference, setCircumference] = useState(0);

  const fileSize = 1000; //change this int to adjust how long the file upload will take
  const progressFillRef = useRef();

  useEffect(() => {
    if(downloadAmount <= fileSize) {
      const simulateFileDownload = setInterval(() => {
        const downloadAmountToAdd = Math.floor(Math.random() * 20);
        if((downloadAmount + downloadAmountToAdd) < fileSize) {
          setDownloadAmount(downloadAmount + downloadAmountToAdd);
        } else {
          setDownloadAmount(fileSize);
        }
        setDownloadPercentage(Math.floor((downloadAmount/fileSize) * 100));
        // at stroke-dashffset = 0 the circle will be 100% filled
        progressFillRef.current.style.strokeDashoffset = circumference - (circumference * (downloadAmount/fileSize)); 
  
      }, 1000);
      return () => clearInterval(simulateFileDownload);
    }
  });

  useEffect(() => {
    const radius = progressFillRef.current.r.baseVal.value;
    setCircumference(radius * Math.PI * 2); // stroke-dashoffset = circumference means circle will be 0% filled 
  }, [])


  return (
    <div className="App">
      <div class="spinner">
        <div class="circle">
          <svg width="84" height="84" class="circle__svg">
            <circle cx="41" cy="41" r="38" class="circle__progress circle__progress--path"></circle>
            <circle ref={progressFillRef}  cx="41" cy="41" r="38" class="circle__progress circle__progress--fill"></circle>
          </svg>

          <div class="percent">
            <span class="percent__int">{downloadPercentage}%</span>
          </div>
        </div>

        <span class="label">{downloadPercentage < 100 ? "Downloading" : "Download Complete"}</span>
      </div>
    </div>
  );
}

export default App;
