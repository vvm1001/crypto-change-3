$(document).ready(function () {
    $(".wallets__add-worker").click(function () {
      $(".modal, modal-add-worker").fadeIn();
    });
    $(".modal__cross").click(function () {
      $(".modal, modal-add-worker, modal-edit-worker").fadeOut();
    });
    $("#loginForm").submit(function (e) {
      e.stopImmediatePropagation()
      e.preventDefault();
      $.ajax({
        method: "POST",
        url: URL + "/login",
        data: $(this).serialize(),
        success: function (token) {
          document.cookie = `token=${token}; Max-Age=300`;
          location = './adminMain.html'
        },
        error: function () {
          location.reload();
        }
      });
      
    });
  });
  