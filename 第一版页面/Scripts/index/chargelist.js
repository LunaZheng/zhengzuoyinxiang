var search;
$(function () {

    $("#btnok").on("click", function () {
        search();
    });

    search = function () {
        var state = $("#selstate").val();
        $.ajax({
            type: 'POST',
            url: "../index/chargesearch?state=" + state,
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                var html = "";
                if (data.data == null || data.data.length == 0) {
                    $("#tbody").html(html);
                    return;
                }
                var jsonstr = data.data;
                for (var i = 0; i < jsonstr.length; i++) {
                    html += "<tr>";
                    html += "<td>" + jsonstr[i].acc + "</td>";
                    html += "<td>" + jsonstr[i].nickname + "</td>";
                    html += "<td>" + jsonstr[i].tel + "</td>";
                    html += "<td>" + jsonstr[i].job + "</td>";
                    html += "<td>" + (jsonstr[i].ischarge == 0 ? "否" : "是") + "</td>";
                    if (jsonstr[i].ischarge == 0)
                        html += "<td><a style='cursor:pointer' onclick='update(\"" + jsonstr[i].nickname + "\"," + jsonstr[i].userid + ",1);'>更改</a></td>";
                    else if (jsonstr[i].ischarge == 1)
                        html += "<td><a onclick='update(" + jsonstr[i].userid + ",0);'>取消</a></td>";
                    html += "</tr>";
                }
                $("#tbody").html(html);
            },
            error: function (data) {
                $.alert("数据加载失败");
            }
        });
    }

    search();
});

function update(name, userid, state) {
    var tip = "";

    if (state == 1) {
        tip = '您确定"' + name + '"可以在客户端充值吗?';
    }
    else {
        tip = '您确定取消"' + name + '"在客户端充值功能吗?';
    }

    if (confirm(tip)) {
        $.ajax({
            type: 'POST',
            url: "../index/chargeupdate?userids=" + userid + "&state=" + state,
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                else {
                    $.alert("更新成功");
                    search();
                }
            },
            error: function (data) {
                $.alert("数据加载失败");
            }
        });
    }

}
