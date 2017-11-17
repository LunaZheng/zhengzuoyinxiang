
$(function () {

    var txtprice = $("#txtprice");
    var txtlastprice = $("#txtlastprice");
    var txtbalanc = $("#txtbalanc");

    var minprice = parseFloat(txtlastprice.val()) - parseFloat(txtbalanc.val());

    if (minprice <= 1) {
        minprice = parseFloat(txtlastprice.val());
    }
    if (minprice < 1000)
        minprice = 1000;
    txtprice.val(minprice);

    var height = $(window).height();
    $("#OKBtn").on("click", function () {

        $("#payModal").modal();
        $("#txtmoney").val($("#txtprice").val());

        /*
        var heightmodel = $("#payModal").height();
        var top = (height - heightmodel) / 2 - 25;
        var div1 = document.getElementById('payModal');
        div1.style.position = "fixed";
        div1.style.left = "45%";
        div1.style.top = top + "px";
        */
    });
    $("#addBtn").click(function () {

        var num = $("#txtmoney").val();

        var v = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
        if (!v.test(num)) {
            $.alert("请输入大于0的金额(最多2位小数)");
            return;

        }

        $.ajax({

            async: false,
            type: 'POST',
            url: "cz?p=" + num,
            success: function (data) {
                if (!data.r == -1) {
                    $.alert(data.msg);
                    return;
                } else {
                    var t = $("input:radio[name='optionsRadiosinline']:checked").val();
                    var action;
                    if (t == "1") {
                        action = "http://facpay.corgii.com/pay/tenpay/account.aspx?" + data.data;
                    } else {
                        action = "http://facpay.corgii.com/pay/alipay/account.aspx?" + data.data;
                    }

                    var des = $("#txtdes").val();

                    var form = $("<form></form>");
                    form.attr('action', action);
                    form.attr('method', 'post');
                    form.attr('target', '_blank');
                    var input1 = $("<input type='hidden' name='txtczdes' />");
                    input1.attr('value', des);
                    form.append(input1);
                    form.appendTo("body");
                    form.css('display', 'none');
                    form.submit();

                }

            }

        });
    });


});