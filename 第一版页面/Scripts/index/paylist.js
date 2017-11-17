

var pageindex = 1;
var pagesize = 10;
var search;
$(function () {


    $('#divbegin').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: true,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd"
    });
    $('#divend').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: true,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd"
    });
    var d = new Date();
    //初始化日期
    $("#divend").datetimepicker("setDate", d);
    $("#divbegin").datetimepicker("setDate", new Date(new Date(d).setMonth(d.getMonth() - 1)));


    $(".glyphicon-remove").on("click", function () {
        $(this).parent().parent().find("input").val("");
        return false;
    });

    search = function (p) {

        var begin = $("#txtbegin").val();
        var end = $("#txtend").val();

        $.ajax({
            type: 'POST',
            url: "../index/paylists?begin=" + begin + "&end=" + end + "&pageindex=" + p + "&pagesize=" + pagesize,
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    $(".page_div3").html('');
                    $("#tbody").html('');
                    return;

                }

                if (data.data.length == 0) {
                    $.alert('暂无数据');
                    $(".page_div3").html('');
                    $("#tbody").html('');
                    return;
                }

                var html = "";
                var jsonstr = data.data;
                for (var i = 0; i < jsonstr.length; i++) {
                    html += "<tr>";
                    html += "<td>" + jsonstr[i].shopblancecrushrecordid + "</td>";
                    html += "<td>" + jsonstr[i].crushtime + "</td>";
                    html += "<td>￥" + jsonstr[i].crushmoney + "</td>";
                    html += "<td>￥" + jsonstr[i].oldoverage + "</td>";
                    html += "<td>￥" + jsonstr[i].overage + "</td>";
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

    $("#updateOk").on("click", function () {
        search(pageindex);
    });
    $("#btnExcel").on("click", function () {

        var begin = $("#txtbegin").val();
        var end = $("#txtend").val();

        $.ajax({
            type: 'POST',
            url: "../index/paylistsexcel?begin=" + begin + "&end=" + end + "&pageindex=1&pagesize=99999999",
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;

                }

                $('#myModal').modal('show');
                $('#down').attr("href", data.data);

            },
            error: function (data) {
                $.alert("数据加载失败");
            }

        });

    });




    search(1);


});
