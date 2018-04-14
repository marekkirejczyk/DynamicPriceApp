class QRCodeReader {

    constructor(onQRCodeScanCallback, onNoQRCodeScanCallback) {
      this.video = document.createElement("video");
      this.canvasElement = document.getElementById("canvas");
      this.canvas = this.canvasElement.getContext("2d");
      this.loadingMessage = document.getElementById("loadingMessage");
      this.onQRCodeScanCallback = onQRCodeScanCallback;
      this.onNoQRCodeScanCallback = onNoQRCodeScanCallback;
      const that = this;
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then( (stream) => {
        that.video.srcObject = stream;
        that.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        that.video.play();
        requestAnimationFrame(() => that.tick());
      });
    }
  
    drawLine(begin, end, color) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = 4;
      this.canvas.strokeStyle = color;
      this.canvas.stroke();
    }
  
    tick() {
      loadingMessage.innerText = "⌛ Loading video..."
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        this.canvasElement.hidden = false;
  
        this.canvasElement.height = this.video.videoHeight;
        this.canvasElement.width = this.video.videoWidth;
        this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
        var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          this.onQRCodeScanCallback(code);
        } else {
          this.onNoQRCodeScanCallback();
        }
      }
      requestAnimationFrame(() => this.tick());
    }
  
  }