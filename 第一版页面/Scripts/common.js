
; (function ($) {
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    };
    $.getUrlParam = getUrlParam;

})(jQuery);

$.fn.extend({
    displayPart: function () {
        var displayLength = 100;
        displayLength = this.attr("displayLength") || displayLength;
        var text = this.text();
        if (!text) return "";

        var result = "";
        var count = 0;
        for (var i = 0; i < displayLength; i++) {
            var _char = text.charAt(i);
            if (count >= displayLength) break;
            if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文 

            result += _char;
            count++;
        }
        if (result.length < text.length) {
            result += "...";
        }
        this.text(result);
    }
    //$.each($("[displayLength]"),function(){ $(this).displayPart(); });
});

; (function ($) {
    var div = $("<div>").css({
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        "background-color": "rgba(0,0,0,0.1)",
        "z-index": "1051"
    });
    var p = $("<p>").css({
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100px",
        height: "100px",
        margin: "auto",
        color: "#fff",
        "font-size": "20px",
        "line-height": "100px",
        "text-align": "center",
        "background-color": "rgba(0,0,0,0.5)",
        "border-radius": "5px"
    }).text("loading...");
    div.append(p);
    $(document).ajaxStart(function () {
        $("body").append(div);
    });
    $(document).ajaxStop(function () {
        div.remove();
    });

})(jQuery);



; (function ($) {
    var div = $("<div>").css({
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        "background-color": "rgba(0,0,0,0)",
        "z-index": "1051"
    });
    var p = $("<p>").css({
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "200px",
        height: "100px",
        margin: "auto",
        color: "#fff",
        "font-size": "20px",
        "line-height": "100px",
        "text-align": "center",
        "background-color": "rgba(0,0,0,0.5)",
        "border-radius": "5px"
    });
    div.append(p);

    $.loadingbegin = function (str) {
        p.text(str).width(str.length * 14 + 100);
        $("body").append(div);
    };
    $.loadingend = function () {
        div.remove();
    };



    $.alert = function (str) {
        p.text(str).width(str.length * 14 + 100);
        $("body").append(div);
        setTimeout(function () {
            div.remove();
        }, 2000);
    };
})(jQuery);



function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function getDateStr(strTime) {
    var date = new Date(Date.parse(strTime.replace(/-/g, "/")));
    return date;
}
function Trim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global != undefined && is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}


function numv(value) {
    if ((/^(\+|-)?\d+$/.test(value)) && value > 0) {
        return true;
    } else {
        return false;
    }
}




function countDown(begin, end, fn) {
    var maxtime = (new Date(end) - new Date()) / 1000;//剩余秒
    var timer = setInterval(function () {

        if (new Date() < new Date(begin)) {
            fn("尚未开始");
        } else {

            if (maxtime >= 0) {
                var dd = parseInt(maxtime / 60 / 60 / 24, 10);//剩余的天数  
                var hh = parseInt(maxtime / 60 / 60 % 24, 10);//剩余的小时数  
                var mm = parseInt(maxtime / 60 % 60, 10);//剩余的分钟数  
                var ss = parseInt(maxtime % 60, 10);//[剩余的秒数  
                hh = checkTime(hh);
                mm = checkTime(mm);
                ss = checkTime(ss);

                fn("" + dd + "天" + hh + "时" + mm + "分" + ss + "秒");
                --maxtime;
            }
            else {
                clearInterval(timer);
                fn("已结束");
            }
        }
    }, 1000);
}


function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}




function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}


var shareimg = "http://facpay.corgii.com/img/shareTip.png";
var browerimg = "http://facpay.corgii.com/img/live_weixin.png";
showShare = function (t) {

    var showimg = "";

    if (t == 1)
        showimg = shareimg;
    else
        showimg = browerimg;


    var div = $("<div>").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "background-color": "#000",
        "opacity": "0.5",
        "z-index": "200"
    });
    var img = $("<img>").attr("src", showimg).css({
        "position": "fixed",
        "top": "0",
        "right": "0",
        "width": "90%",
        "z-index": "300"
    });
    div.append(img);
    $("body").append(div);
    $("body").append(img);
    div.click(function () {
        div.remove();
        img.remove();
    });
}


function formatDateTime(inputTime) {
    return new Date(parseInt(inputTime) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
};


Date.prototype.Format = function (fmt) {  
    var o = {  
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };  
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
}  

