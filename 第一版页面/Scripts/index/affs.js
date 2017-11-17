
var pageindex = 1;
var pagesize = 10;
var search;
$(function () {
    search = function (p) {
        pageindex = p;
        $.ajax({
            type: 'POST',
            url: "../index/affsearch?pageindex=" + pageindex + "&pagesize=" + pagesize,
            success: function (data) {
                var html = "";

                if (data.r == -1) {
                    $.alert(data.msg);
                    $("#ulaffs").html(html);
                    $(".page_div3").hide();
                    return;
                }


                var jsonstr = data.data;

                for (var i = 0; i < jsonstr.length; i++) {

                    html += '<li class="sty"><a target="_blank" href="../index/banner?id=' + jsonstr[i].navid + '&t=' + jsonstr[i].navtype + '">' + jsonstr[i].title + '<span class="sp1">' + jsonstr[i].createtime.substring(0, 10) + '</span></a></li>';

                }
                $("#ulaffs").html(html);


                if (jsonstr[0].totalcount > pagesize) {
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
    $('#myCarousel').carousel({
        interval: 3000
    });
    search(1);

});
