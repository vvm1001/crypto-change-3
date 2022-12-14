$.ajax({
    url:  URL + "/getStyles",
    method: 'GET',
    dataType: "json",
    success: function (data) {
        $(':root').css('--main-bg-color', '#fff');
        $(':root').css('--main-text-color', '#000');
        $(':root').css('--main-active-color', '#f57444');
        $(':root').css('--main-block-color', '#fff');
    },
});
    