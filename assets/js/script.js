$(document).ready(function () {
  function exchange(send, receive, type) {
    (type)
    if (type == "send") {
      $.ajax({
        url: URL + "/handler?send=" + send + "&receive=" + receive,
        dataType: "json",
        success: function (data) {
          data = data[receive];
          let min = (50 / data).toFixed(5) - 0;
          let max = (200000 / data).toFixed(5) - 0;
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
            ).toFixed(5) - 0;
          let max =
            (
              (($(".exchange__block-input-send").data("max") * data) )
            ).toFixed(5) - 0;
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
    $(".exchange__block-list-send .exchange__block-item_active img")[0]["alt"],
    "USDT",
    "send"
  );
  exchange(
    $(".exchange__block-list-send .exchange__block-item_active img")[0]["alt"],
    $(".exchange__block-list-receive .exchange__block-item_active img")[0][
      "alt"
    ],
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

  let firstNum = Math.floor(Math.random() * 19) + 1;
  $(".exchange__block-input-captcha-first-num").val(firstNum);
  let secondNum = Math.floor(Math.random() * 19) + 1;
  $(".exchange__block-input-captcha-second-num").val(secondNum);
  let sum = firstNum + secondNum;

  function captcha() {
    firstNum = Math.floor(Math.random() * 19) + 1;
    $(".exchange__block-input-captcha-first-num").val(firstNum);
    secondNum = Math.floor(Math.random() * 19) + 1;
    $(".exchange__block-input-captcha-second-num").val(secondNum);
    sum = firstNum + secondNum;
  }

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

  $(".exchange__block-item").click(function () {
    $(this).parent().children().removeClass("exchange__block-item_active");
    $(this).addClass("exchange__block-item_active");

    if ($(this).hasClass("exchange__block-item-send")) {
      $(".exchange__block-header-send").text(
        $(this).children("img").data("name")
      );
    } else {
      $(".exchange__block-header-receive").text(
        $(this).children("img").data("name")
      );
    }
    exchange(
      $(".exchange__block-list-send .exchange__block-item_active img")[0][
        "alt"
      ],
      "USDT",
      "send"
    );
    exchange(
      $(".exchange__block-list-send .exchange__block-item_active img")[0][
        "alt"
      ],
      $(".exchange__block-list-receive .exchange__block-item_active img")[0][
        "alt"
      ],
      "receive"
    );
  });

  $(".exchange__block-form").submit(function (e) {
    e.preventDefault();

    let error = 0;
    if ($(".exchange__block-input-captcha-sum").val() != sum) {
      error = 1;

      $(".exchange__block-input-captcha-sum").css({
        border: "1px solid red",
      });

      captcha();
    } else {
      $(".exchange__block-input-send").css({
        border: "1px solid transparent",
      });
    }

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

      captcha();
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

      captcha();
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
          fromCoin: $(
            ".exchange__block-list-send .exchange__block-item_active img"
          )[0]["alt"],
          fromCoinVal: $(".exchange__block-input-send").val(),
          toWallet: $(".exchange__block-input-receive-address").val(),
          toCoin: $(
            ".exchange__block-list-receive .exchange__block-item_active img"
          )[0]["alt"],
          toCoinVal: $(".exchange__block-input-receive").val(),
        },
        success: function (data) {
          location.href = `transaction.html?id=` + data;
        },
      });
    }
  });

  $(".how-exchange__block-btn").click(function () {
    $(this).html("Сhecking your wallet...");
    $(this).css({
      background: "var(--main-active-color) ",
      color: "#FFFFFF",
    });

    setTimeout(function () {
      if (
        $(".how-exchange__block-input").val().length < 20 ||
        $(".how-exchange__block-input").val().length > 120 ||
        !/\d/.test($(".how-exchange__block-input").val()) ||
        !/[a-zA-Z]/.test($(".how-exchange__block-input").val())
      ) {
        $(".how-exchange__block-btn").html(
          '<img src="./assets/img/how-exchange/error.svg" alt="error"> Denied!'
        );
        $(".how-exchange__block-btn").css({
          background: "#FF0000",
          color: "#FFFFFF",
        });
      } else {
        $(".how-exchange__block-btn").html(
          '<img src="./assets/img/how-exchange/success.svg" alt="error"> Confirmed!'
        );
        $(".how-exchange__block-btn").css({
          background: "#00FFA3",
          color: "#000000",
        });
      }
    }, 1500);
  });

  $(".exchange__block-input-val").change(function () {
    if ($(this).hasClass("exchange__block-input-send")) {
      exchange(
        $(".exchange__block-list-send .exchange__block-item_active img")[0][
          "alt"
        ],
        $(".exchange__block-list-receive .exchange__block-item_active img")[0][
          "alt"
        ]
      );
    } else {
      exchange(
        $(".exchange__block-list-send .exchange__block-item_active img")[0][
          "alt"
        ],
        $(".exchange__block-list-receive .exchange__block-item_active img")[0][
          "alt"
        ],
        "calc"
      );
    }
  });

  $(".exchange__block-input-val").keyup(function () {
    if ($(this).hasClass("exchange__block-input-send")) {
      exchange(
        $(".exchange__block-list-send .exchange__block-item_active img")[0][
          "alt"
        ],
        $(".exchange__block-list-receive .exchange__block-item_active img")[0][
          "alt"
        ]
      );
    } else {
      exchange(
        $(".exchange__block-list-send .exchange__block-item_active img")[0][
          "alt"
        ],
        $(".exchange__block-list-receive .exchange__block-item_active img")[0][
          "alt"
        ],
        "calc"
      );
    }
  });

  exchange(
    $(".exchange__block-list-send .exchange__block-item_active img")[0]["alt"],
    $(".exchange__block-list-receive .exchange__block-item_active img")[0][
      "alt"
    ],
    "receive"
  );
  exchange(
    $(".exchange__block-list-send .exchange__block-item_active img")[0]["alt"],
    $(".exchange__block-list-receive .exchange__block-item_active img")[0][
      "alt"
    ],
    "receive"
  );
});
