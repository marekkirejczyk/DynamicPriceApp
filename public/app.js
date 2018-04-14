class Application {

  start() {
    if (document.getElementsByClassName('indexContainer').length)
      this.setupWelcome();
    else if (document.getElementsByClassName('qrScanContainer').length)
      this.setupScanQR();
    else if (document.getElementsByClassName('priceContainer').length)
      this.setupPrice();
    else if (document.getElementsByClassName('aboutContainer').length)
      this.setupAbout();
  }

  navigateToQrCode() {
    window.location.href = './qrscan.html';
  }

  navigateToPrice(id) {
    window.location.href = `./price.html?id=${id}`;
  }

  setupWelcome() {
    console.log('setupWelcome');
    document.getElementById("makeitbigger").onclick = this.navigateToQrCode;
  }

  setupPrice() {
    console.log('setupPrice');
    var urlString = window.location.href;
    var url = new URL(urlString);
    var id = url.searchParams.get("id");
    console.log(id);
  }

  setupAbout() {
    console.log('setupAbout');
  }

  setupScanQR() {
    console.log('setupScanQR');
    new QRCodeReader((code) =>
      window.location.href = `./price.html?id=${code.data}`
    );
  }

}

new Application().start();