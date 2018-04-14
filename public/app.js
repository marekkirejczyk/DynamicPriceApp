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
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");
    console.log(document);
    document.getElementById('priceFrom').innerHTML = 10.00;
    document.getElementById('priceTo').innerHTML = 20.00;
    document.getElementById('productId').innerHTML = id;
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