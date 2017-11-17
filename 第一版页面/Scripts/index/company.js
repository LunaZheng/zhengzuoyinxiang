
$(function () {
    $("#OKBtn").on("click", function () {
        var address = $("#address");
        var shippingaddress = $("#shippingaddress");
        var ShopKeeper = $("#ShopKeeper");
        var Tel1 = $("#Tel1");
        var FinancialPerson = $("#FinancialPerson");
        var FinancialPersonTel = $("#FinancialPersonTel");

        if (Trim(address.val()) == "") {
            $.alert("请输入地址");
            address.focus();
            return;
        }
        if (Trim(shippingaddress.val()) == "") {
            $.alert("请输入地址");
            shippingaddress.focus();
            return;
        }
        if (Trim(ShopKeeper.val()) == "") {
            $.alert("请输入联系人");
            ShopKeeper.focus();
            return;
        } if (Trim(Tel1.val()) == "") {
            $.alert("请输入联系电话");
            Tel1.focus();
            return;
        } if (Trim(FinancialPerson.val()) == "") {
            $.alert("请输入联系人");
            FinancialPerson.focus();
            return;
        } if (Trim(FinancialPersonTel.val()) == "") {
            $.alert("请输入联系电话");
            FinancialPersonTel.focus();
            return;
        }

        var param = {
            shippingaddress: address.val(),
            address: shippingaddress.val(),
            ShopKeeper: ShopKeeper.val(),
            Tel1: Tel1.val(),
            FinancialPerson: FinancialPerson.val(),
            FinancialPersonTel: FinancialPersonTel.val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            url: "../index/companys",
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                $.alert("修改成功");
            },
            error: function (data) {
                $.alert("修改失败");
            }

        });

    });
});