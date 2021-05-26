import './Spinner.css';
import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Spinner({fileSize, pauseSpinner, transferAmountPerSecond}) {

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
    if((downloadAmount + transferAmountPerSecond) < fileSize) {
      setDownloadAmount(downloadAmount + transferAmountPerSecond);
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
    return Math.ceil(circumference - (circumference * (downloadAmount/fileSize)));
  }

  return (
      <div className="spinner">
        <div className="circle">
          <svg data-cy="spinner-svg" width="84" height="84" className="circle__animate" ref={circleRef}>
            <circle cx="41" cy="41" r="39" className="circle__progress circle__progress--path"></circle>
            <circle data-cy="progress-fill" ref={progressFillRef}  cx="41" cy="41" r="39" className="circle__progress circle__progress--fill"></circle>
          </svg>

          <div className="percent">
            <span data-cy="percent-transfer" className="percent__int">{Math.floor((downloadAmount/fileSize) * 100)}%</span>
          </div>
        </div>

        {pauseSpinner ? 
          
          <span className="label" data-cy="label">Paused</span> :
        
          <span className="label" data-cy="label">{(downloadAmount/fileSize) < 1 ? "Transferring" : "Transfer Complete"}</span>
   
        }   
        
        </div>
  );
};

Spinner.defaultProps = {
  fileSize: 1000,
  pauseSpinner: true,
  transferAmountPerSecond: 20
}

Spinner.propTypes = {
  fileSize: PropTypes.number,
  pauseSpinner: PropTypes.bool,
  transferAmountPerSecond: PropTypes.number
}

export default Spinner;