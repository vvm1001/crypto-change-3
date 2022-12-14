$(document).ready(function () {
  function exchange(send, receive, type) {
    (type)
    if (type == "send") {
      $.ajax({
        url: URL + "/handler?send=" + send + "&receive=" + receive,
        dataType: "json",
        success: function (data) {
          data = data[receive];
          let min = (50 / data).toFixed(8) - 0;
          let max = (200000 / data).toFixed(8) - 0;
          $(".exchange__block-text-send span").text(
            "(" + min + " — " + max + ")"
          );
          $(".exchange__block-input-send").val(min);
          $(".exchange__block-input-send").data("min", min);
          $(".exchange__block-input-send").data("max", max);
        },
      });
    } else if (type == "receive") {
      $.ajax({
        url: URL + "/handler?send=" + send + "&receive=" + receive,
        dataType: "json",
        success: function (data) {
          data = data[receive];
          let min =
            (
              (($(".exchange__block-input-send").data("min") * data) ) 
            ).toFixed(8) - 0;
          let max =
            (
              (($(".exchange__block-input-send").data("max") * data) )
            ).toFixed(8) - 0;
          $(".exchange__block-text-receive span").text(
            "(" + min + " — " + max + ")"
          );
          $(".exchange__block-input-receive").val(min);
          $(".exchange__block-input-receive").data("min", min);
          $(".exchange__block-input-receive").data("max", max);
        },
      });
    } else if (type == "calc") {
      $.ajax({
        url:  URL + "/handler?send=" + send + "&receive=" + receive,
        dataType: "json",
        success: function (data) {
          data = data[receive];
          ('bottom')
          let val =
            (
              ($(".exchange__block-input-receive").val()) /
              data
            ).toFixed(8) - 0;
          $(".exchange__block-input-send").val(val);
            (val)
        },
      });
    } else {
      $.ajax({
        url:  URL + "/handler?send=" + send + "&receive=" + receive,
        dataType: "json",
        success: function (data) {
          data = data[receive];
          let val =
            (
              (($(".exchange__block-input-send").val() * data) )
            ).toFixed(8) - 0;
          $(".exchange__block-input-receive").val(val);
        },
      });
    }
  }

  exchange(
    $("#id_select2_example").val(),
    "USDT",
    "send"
  );
  exchange(
    $("#id_select2_example").val(),
    $("#id_select3_example").val(),
    "receive"
  );

  $("body").css({
    overflow: "auto",
  });
  $(".preloader").fadeOut(1000);

  wow = new WOW({
    animateClass: "animate__animated",
  });
  wow.init();

  function GenerateTransactions() {
    let TxHash = Math.random().toString(36).substring(2) + "...";

    let Block = (Math.random() * (999999 - 100000) + 100000).toFixed(0);

    let temp = "1234567890FJKTFBSAE",
      From = "";
    To = "";
    for (let i = 0; i < 6; i++) {
      From += temp[Math.round(Math.random() * (temp.length - 1))];
      To += temp[Math.round(Math.random() * (temp.length - 1))];
    }
    From += "...";
    To += "...";

    let ValueCoin = $(".exchange__block-list-send li").find("img")[
      Math.floor(Math.random() * $(".exchange__block-list-send li").length)
    ]["alt"];
    if (ValueCoin == "SHIB") {
      ValueCoin = "BTC";
    }
    $.ajax({
      url:
        "https://min-api.cryptocompare.com/data/price?fsym=" +
        ValueCoin +
        "&tsyms=usdt",
      dataType: "json",
      success: function (data) {
        data = data["USDT"];
        Value =
          parseFloat(
            Math.random() * (900 / data - 500 / data) + 500 / data
          ).toFixed(2) +
          " " +
          ValueCoin;

        $(".transactions__table-content").prepend(
          '<tr class="transactions__tr" style="display: none;"><td class="transactions__td">' +
            TxHash +
            '</td><td class="transactions__td">' +
            Block +
            '</td><td class="transactions__td">' +
            From +
            '</td><td class="transactions__td">' +
            To +
            '</td><td class="transactions__td">' +
            Value +
            '</td><td class="transactions__td transactions__td_blue">Right now</td></tr>'
        );
        $(".transactions__table-content tr:first").fadeIn();

        if ($(".transactions__table-content tr").length > 5) {
          $(".transactions__table-content tr:last").remove();
        }
      },
    });
  }

  GenerateTransactions();
  setInterval(GenerateTransactions, 10000);

  $(".header__link").click(function () {
    $(".header__burger-content").removeClass("header__burger-content_active");
    $(".header__burger").removeClass("header__burger_active");
  });

  $(".header__lang").click(function () {
    $(".header__lang-dropdown").toggleClass("header__lang-dropdown_active");
  });

  $(".header__btn").click(function () {
    $(".header__burger-content").removeClass("header__burger-content_active");
    $(".header__burger").removeClass("header__burger_active");
  });

  $(".header__burger").click(function () {
    $(this).toggleClass("header__burger_active");
    $(".header__burger-content").toggleClass("header__burger-content_active");
  });

  $("#id_select2_example").change(function () {
    $(".exchange__block-header-send").text(
      $("#id_select2_example option:selected").text()
    );
    exchange(
      $(this).val(),
      "USDT",
      "send"
    );
    exchange(
      $(this).val(),
      $("#id_select3_example").val(),
      "receive"
    );
  });

  $("#id_select3_example").change(function () {
    $(".exchange__block-header-receive").text(
      $("#id_select3_example option:selected").text()
    );
    exchange(
      $("#id_select2_example").val(),
      "USDT",
      "send"
    );
    exchange(
      $("#id_select2_example").val(),
      $(this).val(),
      "receive"
    );
  });

  $(".exchange__block-form").submit(function (e) {
    e.preventDefault();
    let error = 0;
    if (
      $(".exchange__block-input-send").val() <
        $(".exchange__block-input-send").data("min") ||
      $(".exchange__block-input-send").val() >
        $(".exchange__block-input-send").data("max") ||
      $(".exchange__block-input-receive").val() <
        $(".exchange__block-input-receive").data("min") ||
      $(".exchange__block-input-receive").val() >
        $(".exchange__block-input-receive").data("max")
    ) {
      error = 1;
      $(".exchange__block-input-val").css({
        border: "1px solid red",
      });

    } else {
      $(".exchange__block-input-val").css({
        border: "1px solid transparent",
      });
    }

    if (
      $(".exchange__block-input-receive-address").val().length < 20 ||
      $(".exchange__block-input-receive-address").val().length > 120 ||
      !/\d/.test($(".exchange__block-input-receive-address").val()) ||
      !/[a-zA-Z]/.test($(".exchange__block-input-receive-address").val())
    ) {
      error = 1;

      $(".exchange__block-input-receive-address").css({
        border: "1px solid red",
      });

    } else {
      $(".exchange__block-input-receive-address").css({
        border: "1px solid transparent",
      });
    }

    if (error == 0) {
      $.ajax({
        url: URL + "/createOrder",
        method: "post",
        data: {
          email: $(".exchange__block-input-email").val(),
          exchange:
            $.trim($(".exchange__block-header-send").text()) +
            " on " +
            $.trim($(".exchange__block-header-receive").text()),
          fromCoin: $("#id_select2_example").val(),
          fromCoinVal: $(".exchange__block-input-send").val(),
          toWallet: $(".exchange__block-input-receive-address").val(),
          toCoin: $("#id_select3_example").val(),
          toCoinVal: $(".exchange__block-input-receive").val(),
        },
        success: function (data) {
          location.href = `transaction.html?id=` + data;
        },
      });
    }
  });

  $(".exchange__block-input-val").change(function () {
    if ($(this).hasClass("exchange__block-input-send")) {
      exchange(
        $("#id_select2_example").val(),
        $("#id_select3_example").val()
      );
    } else {
      exchange(
        $("#id_select2_example").val(),
        $("#id_select3_example").val(),
        "calc"
      );
    }
  });

  $(".exchange__block-input-val").keyup(function () {
    if ($(this).hasClass("exchange__block-input-send")) {
      exchange(
        $("#id_select2_example").val(),
        $("#id_select3_example").val()
      );
    } else {
      exchange(
        $("#id_select2_example").val(),
        $("#id_select3_example").val(),
        "calc"
      );
    }
  });

  exchange(
    $("#id_select2_example").val(),
    $("#id_select3_example").val(),
    "receive"
  );
  exchange(
    $("#id_select2_example").val(),
    $("#id_select3_example").val(),
    "receive"
  );
});
