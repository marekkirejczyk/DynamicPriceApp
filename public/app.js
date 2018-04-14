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

  navigateToAbout(id) {
    window.location.href = `./about.html?id=${id}`;
  }

  setupWelcome() {
    document.getElementById("makeitbigger").onclick = this.navigateToQrCode;
  }

  setupPrice() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");
    document.getElementById('priceFrom').innerHTML = 10.00;
    document.getElementById('priceTo').innerHTML = 20.00;
    document.getElementById('productId').innerHTML = id;
    document.getElementById('goToAbout').onclick = () => this.navigateToAbout(id);
  }

  setupAbout() {
  }

  setupScanQR() {
    new QRCodeReader((code) => this.navigateToPrice(code.data));
  }

}

new Application().start();