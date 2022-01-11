import React from "react";
import Scanner from "react-webcam-qr-scanner";

const QRScanner = (props) => {

  const handleDecode = (result) => {
    console.log("as");
    console.log(result);
  } 

  const handleScannerLoad = (mode) => {
    console.log("as",mode);
  }

  return (
    <Scanner 
    //   className="some-classname"
      onDecode={handleDecode}
      onScannerLoad={handleScannerLoad}
      constraints={{ 
        audio: false, 
        video: { 
          facingMode: "environment" 
        } 
      }}
      captureSize={{ width: 500, height: 500 }}
      
    />
  );
}

export default QRScanner;