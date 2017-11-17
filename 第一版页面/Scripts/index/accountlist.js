
var pageindex = 1;
var pagesize = 20;
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

    var ordprice = $("#lblorderprice");
    search = function (p) {


        var param = {
            starttime: $("#txtbegin").val(),
            endtime: $("#txtend").val(),
            id: "",//$("#txtbillid").val()
            pcids: "",//$("#txtorderid").val()
            key: $("#txtname").val(),
            pageindex: p,
            pagesize: pagesize
        };
        $("#tbody").html('');
        $(".page_div3").html('');
        ordprice.html("");

        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            url: "../index/accountlists",
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                if (data.data.length == 0) {
                    $.alert('暂无数据');
                    return;
                }

                var html = "";
                var jsonstr = data.data;
                var totalarea = 0;
                var totalscprice = 0;
                var totalproprice = 0;
                var totalprice = 0;
                for (var i = 0; i < jsonstr.length; i++) {

                    html += "<tr>";
                   // html += "<td style='width:5%'>" + jsonstr[i].billid + "</td>";
				   html += "<td style='width:5%'><a style='color:blue' target='_blank' href='billdetail?billid="+jsonstr[i].billid +"'> " + jsonstr[i].billid + "</a></td>";
                    html += "<td style='width:10%'>" + jsonstr[i].billordercode + "</td>";
                    html += "<td style='width:10%'>" + jsonstr[i].createtimestr + "</td>";

                    html += "<td style='width:15%;white-space:normal'>" +  parseFloat(jsonstr[i].area).toFixed(2) + "</td>";
                    html += "<td style='width:25%;white-space:normal'>" +  parseFloat(jsonstr[i].scprice).toFixed(2) + "</td>";
                    html += "<td style='width:10%'>￥" +  parseFloat(jsonstr[i].proprice).toFixed(2)+ "</td>";
                    html += "<td style='width:15%'>" +  parseFloat(jsonstr[i].totalprice).toFixed(2)+ "</td>";

                    if (jsonstr[i].status == 0)
                        html += "<td style='width:15%'><label style='color:red'>未结账</label></td>";
                    else
                        html += "<td style='width:15%'><label style='color:black'>已结账</label></td>";
                    html += "</tr>";


                    totalarea += parseFloat(jsonstr[i].area);
                    totalscprice += parseFloat(jsonstr[i].scprice);
                    totalproprice += parseFloat(jsonstr[i].proprice);
                    totalprice += parseFloat(jsonstr[i].totalprice);
                }

                if (html.length > 0) {
					
                    //ordprice.html(ordprice.attr("data-text") + "<label style='color:red'>" + jsonstr[0].tprice.toFixed(2) + "</label>");
					
                    html += "<tr>";
                    html += "<td> </td>";
                    html += "<td> </td>";
                    html += "<td> </td>";
                    html += "<td>￥" + totalarea.toFixed(2) + "</td>";
                    html += "<td>￥" + totalscprice.toFixed(2) + "</td>";
                    html += "<td>￥" + totalproprice.toFixed(2) + "</td>";
                    html += "<td>￥" + totalprice.toFixed(2) + "</td>";
                    html += "<td> </td>";
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
    search(1);


    $("#btnExcel").on("click", function () {

        var param = {
            starttime: $("#txtbegin").val(),
            endtime: $("#txtend").val(),
            id: "",//$("#txtbillid").val()
            pcids: "",//$("#txtorderid").val()
            key: $("#txtname").val(),
            pageindex: 1,
            pagesize: 999999999
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            url: "../index/accountlistsexcel",
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    $("#tbody").html('');
                    $(".page_div3").html('');
                    return;

                }

                $('#myModal').modal('show');
                $('#down').attr("href", data.data);

            },
            error: function (data) {
                $.alert("数据获取失败");
            }

        });

    });

});
