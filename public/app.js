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

  retrieveEvents(assetId) {
    assetId = '0xcf5762ec31a875a18f12142059d54c75482e409b2bc2032efc963b276a724dc3';
    $.ajax({
      url: 'http://gateway-dev.ambrosus.com/assets/' + assetId + '/events',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
      }
    });
  }

  calculatePrice(initialPrice, expirationDate, discountTime, discountType, maxDiscount) {
    const initialDiscountDate = moment(expirationDate).subtract({seconds: discountTime});
    const applyDiscount = moment().diff(initialDiscountDate) > 0;
    console.log('initialDiscountDate', initialDiscountDate);
    console.log('initialPrice: ' + initialPrice);
    console.log('expirationDate: ', expirationDate);
    console.log('maxDiscount: ' + maxDiscount);
    if(!applyDiscount) {
      return initialPrice;
    }
    return discountType === 0 ? this.calculateLinealPrice(initialPrice, expirationDate, discountTime, maxDiscount)
    : this.calculateExpPrice(initialPrice, expirationDate, discountTime, maxDiscount);
  }

  calculateLinealPrice(initialPrice, expirationDate, discountTime, maxDiscount) {
    const initialDiscountDate = expirationDate.subtract({seconds: discountTime});
    const duration = moment.duration(moment().diff(initialDiscountDate));
    let seconds = duration.asSeconds();
    console.log('seconds', seconds)
    if(seconds >= discountTime){
      seconds = discountTime
    }

    return (initialPrice - ((seconds/discountTime).toFixed(4) * maxDiscount * initialPrice)).toFixed(2);
  }

  calculateExpPrice(initialPrice, expirationDate, discountTime, maxDiscount) {
    const initialDiscountDate = expirationDate.subtract({seconds: discountTime});
    const duration = moment.duration(moment().diff(initialDiscountDate));
    let seconds = duration.asSeconds();
    if(seconds >= discountTime){
      seconds = discountTime
    }
    return initialPrice - (initialPrice * maxDiscount)^((discountTime/seconds).toFixed(2));
  }

  setupPrice() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");
    const helper = new BusinessLogic();
    const that = this;
    that.retrieveEvents(id);

    var dateString = '04-14-2018 17:00';
    // document.getElementById('productId').innerHTML = id;
    const priceFrom = 100;
    const maxDiscount = 0.4;
    setInterval(function() {
      console.log(new Date());
      const expirationDate = moment(dateString, 'MM-DD-YYYY HH:mm');
      let price = that.calculatePrice(priceFrom, expirationDate, 7200, 0, maxDiscount);
      document.getElementById('priceTo').innerHTML = price + ' $';
    }, 2000);


    document.getElementById('priceFrom').innerHTML = priceFrom;
    document.getElementById('priceTo').innerHTML = priceFrom - priceFrom*maxDiscount;
    document.getElementById('productId').innerHTML = 'Orange juice: ';
    // document.getElementById('productId').innerHTML = id;
    // document.getElementById('goToAbout').onclick = () => this.navigateToAbout(id);
  }



  setupAbout() {
  }

  setupScanQR() {
    new QRCodeReader((code) => this.navigateToPrice(code.data));
  }

}

new Application().start();
