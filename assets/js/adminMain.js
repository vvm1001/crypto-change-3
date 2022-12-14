$(document).ready(function () {
    (getCookie('token'))
    if (getCookie('token')) {
        $.ajax({
            url: URL + "/isTokenValid?token=" + getCookie('token'),
            method: "get",
            dataType: "json",
            success: function (data) {
                (data)
                if (!data) {
                    location = '/admin.html'
                } else {
                    $.ajax({
                        method: "GET",
                        url: URL + "/getParams?token=" + getCookie('token'),
                        data: $(this).serialize(),
                        success: function (currentParams) {
                            document.querySelector('#paramsForm').innerHTML = `
                            <p class="wallets__text">Пароль</p>
                            <input type="text" class="form-control hero__input" name="password" placeholder="Пароль" value="${currentParams.password}" required>
                            <p class="wallets__text">Саппорт</p>
                            <input type="text" class="form-control hero__input" name="tg_support" placeholder="Саппорт" value="${currentParams.tg_support}" required>
                            <p class="wallets__text">Токен</p>
                            <input type="text" class="form-control hero__input" name="bot_token" placeholder="Токен" value="${currentParams.bot_token}" required>
                            <p class="wallets__text">Айди чата</p>
                            <input type="text" class="form-control hero__input" name="chat_id" placeholder="Айди чата" value="${currentParams.chat_id}" required>
                            <p class="wallets__text">Цвет фона</p>
                            <input type="text" class="form-control hero__input" name="bg_color" placeholder="Цвет фона" value="${currentParams.bg_color}" required>
                            <p class="wallets__text">Активный цвет</p>
                            <input type="text" class="form-control hero__input" name="active_color" placeholder="Активный цвет" value="${currentParams.active_color}" required>
                            <p class="wallets__text">Цвет блоков</p>
                            <input type="text" class="form-control hero__input" name="block_color" placeholder="Цвет блоков" value="${currentParams.block_color}" required>
                            <p class="wallets__text">Цвет текста</p>
                            <input type="text" class="form-control hero__input" name="text_color" placeholder="Цвет текста" value="${currentParams.text_color}" required>
                            <button type="submit" class="btn btn-dark hero__btn">
                                Сохранить
                            </button>
                            `;
                            document.querySelector('#paramsForm').addEventListener('submit', function (e) {
                                e.preventDefault();
                                $.ajax({
                                    method: "POST",
                                    url: URL + "/changeParams?token=" + getCookie('token'),
                                    data: $(this).serialize(),
                                    success: function (requestMessage) {
                                        (requestMessage)
                                        alert(requestMessage);
                                    },
                                });
                            }) ;
                        },
                    });
                   
                }
            },
        });
    }
    if (!getCookie('token')) {
        location = '/admin.html'
    }
});
       
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }