
var pageindex = 1;
var pagesize = 10;
var search;
$(function () {
    search = function (p) {
        pageindex = p;


        $.ajax({
            type: 'POST',
            url: "../index/activitys?pageindex=" + pageindex + "&pagesize=" + pagesize,
            success: function (data) {
                var html = "";

                if (data.r == -1) {
                    $.alert(data.msg);
                    $("#ul").html(html);
                    $(".page_div3").hide();
                    return;
                }


                var jsonstr = data.data;

                for (var i = 0; i < jsonstr.length; i++) {

                    html += '<li style="margin-top: 20px;">';
                    html += '<div class="row row1"><span class="color">[人气活动]</span><span>' + jsonstr[i].title + '</span>';
                    html += '<img src="' + jsonstr[i].img1 + '">';
                    html += '<span class="font">' + jsonstr[i].context + '</span>';
                    html += '</div>';
                    html += '<div class="row btnn">';
                    html += '<a   class="btn" style="line-height: 20px; padding: 0px;" target="_blank" href="' + jsonstr[i].href + '">去看看</a>';
                    html += '</div>';
                    html += '<div class="row title">';
                    html += '<span id="span_' + jsonstr[i].navid + '" >' + gettime(jsonstr[i].navid, jsonstr[i].endtime, jsonstr[i].begintime) + '</span>';
                    html += '<span class="sp">已有' + jsonstr[i].joinnum + '人参加</span>';
                    html += '</div>';
                    html += '</li>';
                }
                $("#ul").html(html);


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

function gettime(actid, end, begin) {
    countDown(begin, end, function (msg) {
        $("#span_" + actid).text(msg);
    });
}