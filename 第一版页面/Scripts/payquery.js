var timer;
var payid = "";
function Refurbish(id) {
    payid = id;
    timer = window.setInterval("getstate()", 5000);
}
function getstate() {

    $.get("../../page/services.ashx?t=payid&payid=" + payid, function (data) {
      
        if (data.r == 1) {
            window.clearInterval(timer);

            $("#divqr").html('');

            $("#divqr").html('<br /><br /><h1 style="color:red">支付成功</h1>');

            //取消二维码显示, 提示支付成功

        }

    });
}
