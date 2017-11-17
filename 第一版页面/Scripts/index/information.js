
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
        $("#txtdes").val("");
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
        var t = $("input:radio[name='optionsRadiosinline']:checked").val();
        var v = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
        if (!v.test(num)) {
            $.alert("请输入大于0的金额(最多2位小数)");
            return;
        }
        var param = {};
        param.payprice = parseInt(num*100);
        param.paymode = parseInt(t);
        param.paydes = $("#txtdes").val();

        $.ajax({

            async: false,
            type: 'POST',
            url: "cz?p=" + (parseInt(num * 100)),
            data:JSON.stringify(param),
            success: function (data) {
                if (!data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                if (data.r == 1) {
                    $.alert(data.msg);
                    $("#payModal").modal("hide");
                }

            }

        });
    });


});


function radzf(t){
	if(t=="wx"){
		$("#imgqrwx").show();
		$("#imgqrzfb").hide();				
	}else{
		$("#imgqrwx").hide();
		$("#imgqrzfb").show();	
	}
}

