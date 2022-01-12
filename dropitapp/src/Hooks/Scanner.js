import { Dialog, DialogContent } from "@mui/material";
import React, { useState, useRef } from "react";
import Scanner from "react-webcam-qr-scanner";

const QRScanner = ({ handleFileTransfer, setQrButtonClick , setErrorBarState}) => {
  const [result, setResult] = useState(true);
  const [remotePeer, setRemotePeer] = useState('');
  const fileInput = useRef(null);
  const handleDecode = (result) => {
    console.log(result.data);
    if (remotePeer === '') {
      setRemotePeer(result.data);
      setResult(false);
      fileInput.current.click();
    }
  }

  const handleScannerLoad = (mode) => {
    console.log("as", mode);
  }

  return (
    <div>
      <input
        ref={fileInput}
        type="file"
        accept="*"
        style={{ display: 'none' }}
        id="contained-button-file"
        multiple
        onClick={(event) => {
          event.target.value = null
        }}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            console.log(remotePeer);
            handleFileTransfer(remotePeer, e.target.files);
            setQrButtonClick(false);
          }
        }}
      />
      <Dialog open={result} onClose={() => {setResult(false);setQrButtonClick(false)}}>
        <DialogContent style={{width: (window.visualViewport.width > 600) ? "400px" : "230px" }}>
          {(navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia) ? null :"Hello" }
          <Scanner style={{ width: (window.visualViewport.width > 600) ? "400px" : "230px", height: "300px" }}
            onDecode={handleDecode}
            onScannerLoad={handleScannerLoad}
            constraints={{
              video: {
                facingMode: "environment"
              }
            }}
            captureSize={{ width: 500, height: 500 }}

          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default QRScanner;