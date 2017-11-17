

var pageindex = 1;
var pagesize = 10;
var probagid = 0;
var jsonstr;
var mergepro;
var search;
var product;
var dz;


$(function () {

    dz = function (bagid) {
        $.ajax({
            type: 'POST',
            url: "../index/propraise?probagid=" + bagid + "&count=1",
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    return;
                }
                else {
                    var lblcount = $("#lbl" + bagid);
                    lblcount.text(data.data);
                }
            },
            error: function (data) {
                $.alert("");
            }

        });
    }

    product = function (protypeid) {
        probagid = protypeid;
        search(1);
    }


    search = function (p) {
        pageindex = p;
        var proname = $(".textsearch").val();

        $.ajax({
            type: 'POST',
            url: "../index/products?pageindex=" + pageindex + "&pagesize=" + pagesize + "&proname=" + proname + "&procode=" + probagid,
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                    $("#tbody").html("");
                    $(".page_div3").hide();
                    return;

                }

                if (data.data.length == 0)
                    return;

                var html = "";
                jsonstr = data.data;
                for (var i = 0; i < jsonstr.length; i++) {
                    html += "<tr>";
                    html += "<td>" + jsonstr[i].producttype + "</td>";
                    html += "<td>" + jsonstr[i].productname + "</td>";
                    if (jsonstr[i].thumbpic.length > 0) {
                        html += "<td> <img src=' " + jsonstr[i].thumbpic  + "' style='max-width:100px;height:auto;' /></td>";
                    } else {
                        html += "<td>&nbsp;</td>";
                    }
                    html += "<td>" + jsonstr[i].spec + "</td>";
                    //html += "<td class='sp'>￥" + jsonstr[i].productprice + "</td>";
                    html += "<td><span style='cursor:pointer' onclick='dz(" + jsonstr[i].productbagid + ");' ><img src='../img/click_03.png'><label style='padding-left:3px;' id='lbl" + jsonstr[i].productbagid + "' >" + jsonstr[i].praisecount + "</label></span></td>";
                    html += " <td class='jia'><label style='cursor:pointer' onclick='create(" + jsonstr[i].productbagid + ");' >＋</label></td>";
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

    $(".btn1").on("click", function () {
        search(1);
    });
    $("#left li").click(function () {
        $("#left li #top").css("background", "#00ADB1");
        $(this).css("background", "#8CF0F2").siblings().css("background", "#49CBCD");

    });

    mergepro = function () {
        var name = $("#txtname");
        if (Trim(name.val(), "g") == "") {
            $.alert("请输入组合名");
            name.focus();
            return;
        }
        var prom = [];


        var trs = $("[id*=txtnum_]");
        var check;
        var flag = false;
        $.each(trs, function (index, obj) {
            check = $(obj);
            if (!numv(check.val())) {
                flag = true;
                check.focus();
                return false;
            }
            prom.push({ "probagid": check.data("bagid"), "num": parseInt(check.val()) });
        });
        if (flag) {
            $.alert("请输入大于0的数字");
            return;
        }


        $.ajax({
            type: 'POST',
            data: JSON.stringify(prom),
            url: "../index/createpro?name=" + name.val(),
            success: function (data) {
                if (data.r == -1) {
                    $.alert(data.msg);
                } else
                    $.alert("创建成功");
            }, error: function (data) {

            }
        });
    }
    search(1);
});

function create(bagid) {
    var checkpro;
    $.each(jsonstr, function (index, obj) {
        if (obj.productbagid == bagid) {
            checkpro = obj;
            return false;
        }
    });

    var html = "";

    if ($("#txtnum_" + bagid).length > 0) {
        $("#txtnum_" + bagid).val(parseInt($("#txtnum_" + bagid).val()) + 1);
    } else {
        html += "<tr id='tr_" + bagid + "'>";
        html += "<td><label id='lblid_" + bagid + "'></label></td>";
        html += "<td>" + checkpro.producttype + "</td>";
        html += "<td>" + checkpro.productname + "</td>";
        html += "<td>" + checkpro.spec + "</td>";
        html += '<td class="sp"><input type="text" id="txtnum_' + bagid + '" data-bagid="' + bagid + '" class="tx" value="1" style="text-align: center;" ></td>';
        html += '<td><a class="jia" style="cursor:pointer" onclick="del(' + bagid + ')" >×</a></td>';
        html += "</tr>";
        $("#tr0").before(html);
        ids();
    }

}

function del(bagid) {
    $("#tr_" + bagid).remove();
    ids();
}

function ids() {
    var trs = $("[id*=lblid_]");
    $.each(trs, function (index, obj) {
        $(obj).text(index + 1);
    });
}