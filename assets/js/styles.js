$.ajax({
    url:  URL + "/getStyles",
    method: 'GET',
    dataType: "json",
    success: function (data) {
        $(':root').css('--main-bg-color', data.bg_color);
        $(':root').css('--main-text-color', data.text_color);
        $(':root').css('--main-active-color', data.active_color);
        $(':root').css('--main-block-color', data.block_color);
    },
});
    