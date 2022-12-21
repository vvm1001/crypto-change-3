$(document).ready(function () {
    if (getCookie('token')) {
        $.ajax({
            url: URL + "/isTokenValid?token=" + getCookie('token'),
            method: "get",
            dataType: "json",
            success: function (data) {
                if (!data) {
                    location = '/admin.html'
                } else {
                    $.ajax({
                        method: "GET",
                        url: URL + "/getWallets?token=" + getCookie('token'),
                        data: $(this).serialize(),
                        success: function (currentWallets) {
                            document.querySelector('#formWallets').innerHTML = `
                            <p class="wallets__text">BTC:</p>
                            <input type="text" class="form-control wallets__input" name="BTC" placeholder="BTC" value="${currentWallets.BTC}" required>
                                                <p class="wallets__text">ETH:</p>
                            <input type="text" class="form-control wallets__input" name="ETH" placeholder="ETH" value="${currentWallets.ETH}" required>
                                                <p class="wallets__text">BNB:</p>
                            <input type="text" class="form-control wallets__input" name="BNB" placeholder="BNB" value="${currentWallets.BNB}" required>
                                                <p class="wallets__text">FTM:</p>
                            <input type="text" class="form-control wallets__input" name="FTM" placeholder="FTM" value="${currentWallets.FTM}" required>
                                                <p class="wallets__text">SOL:</p>
                            <input type="text" class="form-control wallets__input" name="SOL" placeholder="SOL" value="${currentWallets.SOL}" required>
                                                <p class="wallets__text">XRP:</p>
                            <input type="text" class="form-control wallets__input" name="XRP" placeholder="XRP" value="${currentWallets.XRP}" required>
                                                <p class="wallets__text">XMR:</p>
                            <input type="text" class="form-control wallets__input" name="XMR" placeholder="XMR" value="${currentWallets.XMR}" required>
                                                <p class="wallets__text">TRX:</p>
                            <input type="text" class="form-control wallets__input" name="TRX" placeholder="TRX" value="${currentWallets.TRX}" required>
                                                <p class="wallets__text">DASH:</p>
                            <input type="text" class="form-control wallets__input" name="DASH" placeholder="DASH" value="${currentWallets.DASH}" required>
                                                <p class="wallets__text">LTC:</p>
                            <input type="text" class="form-control wallets__input" name="LTC" placeholder="LTC" value="${currentWallets.LTC}" required>
                                                <p class="wallets__text">VET:</p>
                            <input type="text" class="form-control wallets__input" name="VET" placeholder="VET" value="${currentWallets.VET}" required>
                                                <p class="wallets__text">XLM:</p>
                            <input type="text" class="form-control wallets__input" name="XLM" placeholder="XLM" value="${currentWallets.XLM}" required>
                                                <p class="wallets__text">XNO:</p>
                            <input type="text" class="form-control wallets__input" name="XNO" placeholder="XNO" value="${currentWallets.XNO}" required>
                                                <p class="wallets__text">DOGE:</p>
                            <input type="text" class="form-control wallets__input" name="DOGE" placeholder="DOGE" value="${currentWallets.DOGE}" required>
                                                <p class="wallets__text">ADA:</p>
                            <input type="text" class="form-control wallets__input" name="ADA" placeholder="ADA" value="${currentWallets.ADA}" required>
                                                <p class="wallets__text">USDT:</p>
                            <input type="text" class="form-control wallets__input" name="USDT" placeholder="USDT" value="${currentWallets.USDT}" required>
                                                <p class="wallets__text">SHIB:</p>
                            <input type="text" class="form-control wallets__input" name="SHIB" placeholder="SHIB" value="${currentWallets.SHIB}" required>
                                            <button type="submit" class="btn btn-dark hero__btn">
                            Сохранить
                        </button>
                            `;
                            document.querySelector('#formWallets').addEventListener('submit', function (e) {
                                e.preventDefault();
                                $.ajax({
                                    method: "POST",
                                    url: URL + "/changeWallets?token=" + getCookie('token'),
                                    data: $(this).serialize(),
                                    success: function (requestMessage) {
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