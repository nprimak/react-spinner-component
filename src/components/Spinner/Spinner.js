import './Spinner.css';
import { useRef, useEffect, useState } from 'react';

function Spinner({fileSize, pauseSpinner}) {

  const [downloadAmount, setDownloadAmount] = useState(0);
  const [circumference, setCircumference] = useState(0);

  const progressFillRef = useRef();
  const circleRef = useRef();

  useEffect(() => {
    const radius = progressFillRef.current.r.baseVal.value;
    setCircumference(radius * Math.PI * 2);
  }, [])

  useEffect(() => {
    if(pauseSpinner) {
      circleRef.current.style.animationPlayState = "paused";
    } else {
      circleRef.current.style.animationPlayState = "running";
    }
  }, [pauseSpinner]);

  useEffect(() => {
    if(!pauseSpinner && downloadAmount <= fileSize) {
      const simulateFileTransferInstance = setInterval(simulateFileTransfer.bind(), 1000)
      return () => clearInterval(simulateFileTransferInstance);
    }
  }, [downloadAmount, pauseSpinner]);

  function simulateFileTransfer() {
    const downloadAmountToAdd = Math.floor(Math.random() * 20);
    if((downloadAmount + downloadAmountToAdd) < fileSize) {
      setDownloadAmount(downloadAmount + downloadAmountToAdd);
      if(calculateStrokeDashOffset() !== 0) {
        //conditional needed to avoid bug on load - see line 43
        progressFillRef.current.style.strokeDashoffset = calculateStrokeDashOffset();
      }
  } else {
      setDownloadAmount(fileSize);
      // at stroke-dashoffset = 0 the circle will be 100% filled
      progressFillRef.current.style.strokeDashoffset = 0;
    } 
  }

  function calculateStrokeDashOffset() {
    return circumference - (circumference * (downloadAmount/fileSize));
  }

  return (
      <div className="spinner">
        <div className="circle">
          <svg width="84" height="84" className="circle__animate" ref={circleRef}>
            <circle cx="41" cy="41" r="39" className="circle__progress circle__progress--path"></circle>
            <circle ref={progressFillRef}  cx="41" cy="41" r="39" className="circle__progress circle__progress--fill"></circle>
          </svg>

          <div className="percent">
            <span className="percent__int">{Math.floor((downloadAmount/fileSize) * 100)}%</span>
          </div>
        </div>

        {pauseSpinner ? 
          
          <span className="label">Paused</span> :
        
          <span className="label">{(downloadAmount/fileSize) < 1 ? "Downloading" : "Download Complete"}</span>
   
        }   
        
        </div>
  );
};

export default Spinner;