import './Spinner.css';
import { useRef, useEffect, useState } from 'react';

function Spinner(props) {

  const [downloadAmount, setDownloadAmount] = useState(0);
  const [circumference, setCircumference] = useState(0);

  const fileSize = 1000; //change this int to simulate file size and increase length of time to completion
  const progressFillRef = useRef();
  const circleRef = useRef();

  useEffect(() => {
    if(!props.pauseSpinner && downloadAmount <= fileSize) {
      const simulateFileDownload = setInterval(() => {
        const downloadAmountToAdd = Math.floor(Math.random() * 20);
        if((downloadAmount + downloadAmountToAdd) < fileSize) {
          setDownloadAmount(downloadAmount + downloadAmountToAdd);
        } else {
          setDownloadAmount(fileSize);
        }
        // at stroke-dashffset = 0 the circle will be 100% filled
        progressFillRef.current.style.strokeDashoffset = circumference - (circumference * (downloadAmount/fileSize)); 
  
      }, 1000);
      return () => clearInterval(simulateFileDownload);
    }
  }, [downloadAmount, props]);

  useEffect(() => {
    const radius = progressFillRef.current.r.baseVal.value;
    setCircumference(radius * Math.PI * 2); // stroke-dashoffset = circumference means circle will be 0% filled 
  }, [])

  useEffect(() => {
    if(props.pauseSpinner) {
      circleRef.current.style.animationPlayState = "paused";
    } else {
      circleRef.current.style.animationPlayState = "running";
    }
  }, [props]);


  return (
      <div className="spinner">
        <div className="circle">
          <svg width="84" height="84" className="circle__animate" ref={circleRef}>
            <circle cx="41" cy="41" r="38" className="circle__progress circle__progress--path"></circle>
            <circle ref={progressFillRef}  cx="41" cy="41" r="38" className="circle__progress circle__progress--fill"></circle>
          </svg>

          <div className="percent">
            <span className="percent__int">{Math.floor((downloadAmount/fileSize) * 100)}%</span>
          </div>
        </div>

        {props.pauseSpinner ? 
          
          <span className="label">Paused</span> :
        
          <span className="label">{(downloadAmount/fileSize) < 1 ? "Downloading" : "Download Complete"}</span>
   
        }   
        
        </div>
  );
};

export default Spinner;