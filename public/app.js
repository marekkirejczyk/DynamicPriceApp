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
    console.log('setupPrice')
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");
    const priceForm = 7.10;
    const priceTo = 10.50;
    const discount = ((1-priceForm/priceTo)*100).toFixed();
    document.getElementById('priceFrom').innerHTML = `${(priceForm).toFixed(2)} &euro;`;
    document.getElementById('priceTo').innerHTML = `${(priceTo).toFixed(2)} &euro;`;
    document.getElementById('discount').innerHTML = `-${discount}%`;
    document.getElementById('aboutButton').onclick = () => this.navigateToAbout(id);
  }

  setupAbout() {
  }

  setupScanQR() {
    new QRCodeReader((code) => this.navigateToPrice(code.data));
  }

}

new Application().start();