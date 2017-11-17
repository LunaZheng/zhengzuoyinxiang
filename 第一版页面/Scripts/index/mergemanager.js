
var pageindex = 1;
var pagesize = 10;
var search;
var del;

$(function () {

    search = function (p) {
        pageindex = p;
        var txtname = $("#txtname").val();


        $.ajax({
            type: 'POST',
            url: "../index/mergepros?key=" + txtname + "&pageindex=" + pageindex + "&pagesize=" + pagesize,
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    $("#tbody").html("");
                    $(".page_div3").hide();
                    return;
                }

                var html = "";
                var jsonstr = data.data;
                for (var i = 0; i < jsonstr.length; i++) {
                    html += "<tr>";
                    html += "<td>" + jsonstr[i].groupid + "</td>";
                    html += "<td>" + jsonstr[i].groupname + "</td>";
                    html += "<td>" + jsonstr[i].productbagid + "</td>";
                    html += "<td>" + jsonstr[i].productname + "</td>";
                    html += "<td>" + jsonstr[i].spec + "</td>";
                    html += "<td class='sp'>￥" + jsonstr[i].productprice + "</td>";
                    html += "<td>" + jsonstr[i].lasttime + "</td>";
                    html += "<td><label style='cursor:pointer' onclick='del(" + jsonstr[i].groupid + "," + jsonstr[i].productbagid + ");' >删除</label></td>";
                    html += "</tr>";
                }
                $("#tbody").html(html);


                if (jsonstr[0].total > pagesize) {
                    $(".page_div3").show().html('').paging({
                        allcount: jsonstr[0].total,
                        pagesize: pagesize,
                        currentPage: p,
                        callFn: "search"
                    });
                } else {
                    $(".page_div3").hide();
                }

            },
            error: function (data) {
                $.alert("数据加载失败");
            }

        });
    }

    del = function (groupid, probagid) {
        //delpro(int groupid, int probagid, int num)
        $.ajax({
            type: 'POST',
            url: "../index/delpro?groupid=" + groupid + "&probagid=" + probagid + "&num=0",
            success: function (data) {
                if (data.r != 1) {
                    $.alert(data.msg);
                    return;
                }
                $.alert("删除成功");
                search(pageindex);
            },
            error: function () {

            }
        });
    }

    $("#updateOk").on("click", function () {
        search(pageindex);
    });
    search(1);


    var item = document.getElementById("tb"); //获取id为tb的元素(table)
    var tbody = item.getElementsByTagName("tbody")[0]; //获取表格的第一个tbody元素
    var trs = tbody.getElementsByTagName("tr"); //获取tbody元素下的所有tr元素
    for (var i = 0; i < trs.length; i++) { //循环tr元素
        if (i % 2 == 0) {
            trs[i].style.backgroundColor = "#EFF8F7"; // 改变 符合条件的tr元素 的背景色.
        }
    }

});