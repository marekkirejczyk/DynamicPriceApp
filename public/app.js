
outputContainer = document.getElementById("output");
outputMessage = document.getElementById("outputMessage");
outputData = document.getElementById("outputData");

function onQRCodeScanCallback(code) {
  outputMessage.hidden = true;
  outputData.parentElement.hidden = false;
  outputData.innerText = code.data;
}

function onNoQRCodeScanCallback() {
  outputMessage.hidden = false;
  outputData.parentElement.hidden = true;
}


new QRCodeReader(onQRCodeScanCallback, onNoQRCodeScanCallback)