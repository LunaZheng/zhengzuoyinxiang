
$(function () {

    $("#btnok").click(function () {

        var txtnickname = $("#txtnickname");
        var txtjob = $("#txtjob");
        var txtname = $("#txtname");
        var txttel = $("#txttel");


        if (Trim(txtnickname.val(), "g") == "") {
            $.alert("请输入昵称");
            txtnickname.focus();
            return;
        }
        if (Trim(txtjob.val(), "g") == "") {
            $.alert("请输入岗位");
            txtjob.focus();
            return;
        }
        if (Trim(txtname.val(), "g") == "") {
            $.alert("请输入姓名");
            txtname.focus();
            return;
        }
        if (Trim(txttel.val(), "g") == "") {
            $.alert("请输入电话");
            txttel.focus();
            return;
        }

        var parameter = {
            nickname: txtnickname.val(),
            job: txtjob.val(),
            username: txtname.val(),
            tel: txttel.val()
        }

        $.ajax({
            type: 'POST',
            url: "../index/personalinfo",
            data: JSON.stringify(parameter),
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;

                }
                $.alert("更新成功");

            },
            error: function (data) {
                $.alert("更新失败");
            }

        });
    });

});