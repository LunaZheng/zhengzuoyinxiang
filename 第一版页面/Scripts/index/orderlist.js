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
            id: "",//$("#txtorderid").val()
            key: "",//$("#txtproname").val()
            pcids: "",//$("#txtcode").val()
            state: $("#txtname").val(),
            state2: "",//$("#txtbillid").val()
            type: $("#pro").val(),
            starttime: $("#txtbegin").val(),
            endtime: $("#txtend").val(),
            pageindex: p,
            pagesize: pagesize
        };

        ordprice.html("");

        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            url: "../index/ordersearch",
            success: function (data) {
                var html = "";
                if (data.r == -1) {
                    $.alert(data.msg);
                    $("#tbody").html(html);
                    $(".page_div3").hide();
                    return;
                }


                var jsonstr = data.data;
                var tprice = 0;
				
				   

 
 
                for (var i = 0; i < jsonstr.length; i++) {

					 var t = jsonstr[i].ordertimestr.substring(0, 16).replace("-","/").replace("-","/")
					 var date = new Date(t); 
					 date.setDate(date.getDate()+7); 
					 
					 var hj = date.Format("yyyy-MM-dd");
 
                    html += "<tr>";
                    html += "<td style='width:10%;'>" + jsonstr[i].ordertimestr.substring(0, 16) + "</td>";
					html += "<td style='width:10%;'>" + hj+ "</td>";
                    html += "<td style='width:20%;white-space:normal'><div style='word-wrap:break-word;word-break:break-all;width:100%'>" + jsonstr[i].name + "</div></td>";
                    html += "<td style='width:20%;white-space:normal'><div style='word-wrap:break-word;word-break:break-all;width:100%'>" + jsonstr[i].ctmname + "</div></td>";
                    if (usertype == '2') {
                        html += "<td style='width:5%;'>￥" + jsonstr[i].unitprice + "</td>";
                    }

                    if (jsonstr[i].createtimestr.indexOf("1971") < 0) {
                        html += "<td style='width:10%;'>" + jsonstr[i].createtimestr.substring(0, 16) + "</td>";
                    }
                    else {
                        html += "<td style='width:10%;'> &nbsp;</td>";
                    }

                    if (usertype == '2') {
                        //html += "<td><a href='accountlist?id=" + jsonstr[i].billcode + "' target='_blank'>" + jsonstr[i].billcode + "</a></td>";
                        html += "<td style='width:10%;'>" + (jsonstr[i].billcode != undefined ? jsonstr[i].billcode : "") + "</td>";
                    }
                    else {
                        html += "<td style='width:10%;'>" + (jsonstr[i].billcode != undefined ? jsonstr[i].billcode : "") + "</td>";
                    }

                    if (jsonstr[i].currtechname == "已打印账单") {
                        html += "<td style='width:10%;'>制作完成待发货</td>";
                    }
                    else
                        html += "<td style='width:10%;'>" + jsonstr[i].currtechname + "</td>";

                    html += "<td style='width:10%;'>" + (jsonstr[i].currtechname == "已发货" ? jsonstr[i].fetchtimestr.substring(0, 16) : "") + "</td>";

                    html += "<td style='width:10%;'>"+trace(jsonstr[i].shippingno,jsonstr[i].shippingcompanyname,jsonstr[i].shippingcompanyid) + "</td>";
                   
                    html += "<td style='width:5%;'>" + jsonstr[i].outrtnorderproductbagid + "</td>";
                    if (jsonstr[i].currtechname.indexOf("发货") > -1) {
                        html += "<td style='width:5%;'><input type='button' onclick=\"fangong('" + jsonstr[i].billcode + "','" + jsonstr[i].orderproductcode + "'," + jsonstr[i].productbagid + "," + jsonstr[i].orderbagid + "," + jsonstr[i].orderproductbagid + ");\" value='返工' /></td>";
                    } else {
                        html += "<td style='width:5%;'>&nbsp;</td>";
                    }
                    html += "</tr>";

                    tprice += parseFloat(jsonstr[i].unitprice);

                }

                if (html.length > 0) {

                    ordprice.html(ordprice.attr("data-text") + "<label style='color:red'>" + jsonstr[0].orderprice + "</label>");
                    if (usertype == '2') {
                        html += "<tr>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>￥" + tprice.toFixed(2) + "</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "<td>&nbsp;</td>";
                        html += "</tr>";
                    }
                }
                $("#tbody").html(html);
                if (html.length > 0) {
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

    search(1);

    var item = document.getElementById("tb"); //获取id为tb的元素(table)
    var tbody = item.getElementsByTagName("tbody")[0]; //获取表格的第一个tbody元素
    var trs = tbody.getElementsByTagName("tr"); //获取tbody元素下的所有tr元素
    for (var i = 0; i < trs.length; i++) { //循环tr元素
        if (i % 2 == 0) {
            trs[i].style.backgroundColor = "#EFF8F7"; // 改变 符合条件的tr元素 的背景色.
        }
    }

    $("#btnfg").on("click", function () {
        //返工确认

        param.remark = $("#txtdes").val();

        if (Trim(param.remark, "g").length == 0) {
            $.alert("请输入返工原因");
            return;
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(param),
            url: "../index/orderfg",
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                $("#payModal").modal("hide");
                $.alert("返工申请成功");
            },
            error: function (data) {
                $.alert("返工操作失败");
            }

        });


    });


});

var param = {};

function fangong(billcode,
    orderproductcode,
    productbagid,
    orderbagid,
    orderproductbagid) {

    param.billcode = billcode;
    param.orderproductcode = orderproductcode;
    param.productbagid = productbagid;
    param.orderbagid = orderbagid;
    param.orderproductbagid = orderproductbagid;

    $("#txtid").val(orderproductcode);
    $("#payModal").modal("show");
}




function trace(expcode,expname,expid) {
    //encodeURI(expname)
    return "<a href='http://facpay.corgii.com/order/traceorder?code=" + expcode + "&facid=" + facid + "&id=" + expid+"' target='_blank'>"+expcode+"</a>";
 
}