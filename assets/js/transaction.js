$(document).ready(function () {
  $("body").css({
    overflow: "auto",
  });
  $(".preloader").fadeOut(1000);

  wow = new WOW({
    animateClass: "animate__animated",
  });
  wow.init();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  $.ajax({
    url:  URL + "/getOrder?id=" + urlParams.get('id'),
    method: 'GET',
    dataType: "json",
    success: function (data) {
      data = data._doc
      let htmlToRender
      if (data.status === 'CHECK_PAYED'){
        htmlToRender = `
        <section class="transaction">
        <div class="container transaction__container wow animate__fadeInUp">
            <h1 class="transaction__title">
                Обмен <br>
                ${data.exchange}                    </h1>
            <div class="transaction__order">
                Номер заявки <span>${data.id}</span>
            </div>
                 <div class="transaction-2">
                    <div class="transaction__status transaction__status_blue">
                        ЖДЕМ ПОДТВЕРЖДЕНИЙ
                    </div>
                    <div class="transaction__status-text">
                        Ваша заявка в обработке!
                    </div>
                </div>
                                <div class="transaction__btns">
                <a class="transaction__btn" href="./index.html">
                    <img src="./assets/img/transaction/home.svg" alt="home">
                    Вернуться
                </a>
                                    </div>
        </div>
        </section>
        `
        setInterval(function () {
          location.reload();
        }, 5000);
      } else if(data.status === 'APPROVED') {
        htmlToRender = `
        <section class="transaction">
        <div class="container transaction__container wow animate__fadeInUp">
            <h1 class="transaction__title">
                Обмен <br>
                ${data.exchange}                    </h1>
            <div class="transaction__order">
                Номер заявки <span>${data.id}</span>
            </div>
                 <div class="transaction-4">
                    <div class="transaction__status transaction__status_blue">
                        Ваша заявка успешно выполнена
                    </div>
                    <div class="transaction__status-text">
                        Спасибо что выбираете нас!
                    </div>
                </div>
                                <div class="transaction__btns">
                <a class="transaction__btn" href="./index.html">
                    <img src="./assets/img/transaction/home.svg" alt="home">
                    Вернуться
                </a>
                                    </div>
        </div>
        </section>
        `
      } else {
        htmlToRender = `
        <section class="transaction">
        <div class="container transaction__container wow animate__fadeInUp">
            <h1 class="transaction__title">
                Обмен <br>
                ${data.exchange}                    </h1>
            <div class="transaction__order">
                Номер заявки <span>${data.id}</span>
            </div>
                 <div class="transaction-4">
                    <div class="transaction__status transaction__status_red">
                      Заявка отклонена
                    </div>
                    <div class="transaction__status-text">
                      К сожалению ваша заявка отклонена
                    </div>
                </div>
                                <div class="transaction__btns">
                <a class="transaction__btn" href="./index.html">
                    <img src="./assets/img/transaction/home.svg" alt="home">
                    Вернуться
                </a>
                                    </div>
        </div>
        </section>
        `
      }
      document.querySelector('.main').innerHTML = htmlToRender;
      document.querySelector('.transaction__btn')
        .addEventListener('click', (e)=> {
          e.preventDefault();
        location = location.protocol + '//' + location.host;
      })
    }
  });
});
