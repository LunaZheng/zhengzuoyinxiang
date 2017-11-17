
var search;
var categorydata;
var cid = -1;
var pid = -1;
var param = {};
param.pagesize = 12;
param.pageindex = 1;

var searchbag;
var searchcat;
$(function () {

    function cat() {
        $.get("categorys?" + Math.random(), "", function (data) {
            if (data.r == 1) {
                categorydata = data.data;
                if (categorydata == undefined && categorydata.length == 0) {
                    $.alert("类别加载出错");
                }
                else {
                    category();
                }
            }
            else {
                $.alert("类别加载出错");
            }
        });
    }

	
	var tgrs = $('#list-type .body .tgr');
	/*
	$('#list-type .body').on('click', '.tgr', function(){
		$(this).css("background", '#f5f5f5').siblings().css("background", '#fff');
		$(this).find('.icon-arrow').css('background-image', 'url("../img/up.png")').parent().siblings().find('.icon-arrow').css('background-image', 'url("../img/down.png")');
		$('.type-panel').attr('data-idx', $(this).data('idx'));
	});
	*/
	
	
    function category() {
        var htmlcat = ''; 
		
        htmlcat += '<span class="tgr" data-idx="0" onclick="searchbag(this,1)" data-levle="1" data-categoryid="-1" id="lblcategory_-1" >全部分类</span>';
        $.each(categorydata, function (index, value) {			
            htmlcat += '<span class="tgr" data-idx="1" onclick="searchbag(this,2)" data-levle="1" data-categoryid="' + value.categoryid + '" id="lblcategory_' + value.categoryid + '">' + value.categoryname + '</span>';
        });
         $("#divcat").html("").html(htmlcat);
    }


    search = function (p) {

        param.pageindex = p;
        param.key = "";
        param.id = cid + "";
        param.pcids = pid + "";
        param.type = userfacid + "";
        param.state2 = "-1";


        $.ajax({
            type: 'POST',
            url: "ProductBags",
            data: JSON.stringify(param),
            success: function (data) {

                if (data.r == -1) {
                    $("#divcontent").html("");
                    $.alert(data.msg);
                    return;
                }

                var html = "";
                var jsondata = data.data;
                $.each(jsondata, function (index, value) {
                    html += '<div class="list-item">';
                    html += '<a href="detail?pid=' + value.productbagid + '" target="_blank">';
                    html += '<img src="' + value.thumbpath + '" alt="">';
                    html += '</a>';
                    html += '<div class="ctx">';
                    html += '<div class="row">';
                    html += '<span class="c1">￥' + parseFloat(value.price).toFixed(2) + '元</span>';
                    html += '<span class="c2 fr">&nbsp;</span>';
                    html += '</div>';
                    html += '<div class="title">' + value.productbagname + '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                $("#divcontent").html(html);


                if (html.length > 0 && jsondata[0].totalcount > param.pagesize) {
                    $(".page_div3").show().html('').paging({
                        allcount: jsondata[0].totalcount,
                        pagesize: param.pagesize,
                        currentPage: param.pageindex,
                        beforeBtnString: "上一页",
                        nextBtnString: "下一页",
                        lastBtnString: "尾页",
                        firstBtnString: "首页",
                        showPage: 9,
                        gapWidth: 1,
                        callFn: "search"
                    });
                }
                else {
                    $(".page_div3").hide();
                }


            },
            error: function (data) {
                $.alert("数据加载失败");
            }

        });


    }

    cat();

    search(1);

    var $lblcategroys;
	
    searchbag = function (obj,lv) {
        var $obj = $(obj);
        var level = $obj.data("levle");
        var categoryid = $obj.data("categoryid");

        if ($lblcategroys == undefined)
            $lblcategroys = $("[id*=lblcategory_]");

        $.each($lblcategroys, function (index, value) {
           $(this).css("background", '#fff');
        });
		$('.type-panel').attr('data-idx', $obj.data('idx'));
		$obj.css("background", '#f5f5f5');
		
       
		if(lv ==1 && categoryid ==-1 ){
			$(".type-panel").html("<a href='###' data-levle='2' data-categoryid='-1' id='lblcategory_-1' onclick='searchcat(this);'  >全部分类</a>");
		}else{			
			var htmlchi= "";
			var p = getObjects(categorydata,"categoryid",categoryid)[0];
			htmlchi+="<a href='###' data-levle='2'  data-categoryid='-1' onclick='searchcat(this);' id='lblcategory_-1' >全部分类</a>";
			$.each(p.listchild,function(index,value){
				htmlchi+= "<a href='###' data-levle='2'  onclick='searchcat(this);' data-categoryid='"+value.categoryid+"' id='lblcategory_"+value.categoryid+"' >"+value.categoryname+"</a>";				
			});
			$('.type-panel').html(htmlchi);
		}
		pid=-1;
		cid=categoryid;
        search(1); 
    }
	searchcat=function(obj){
		pid=-1;
		var $obj = $(obj); 
        var categoryid = $obj.data("categoryid");
		pid=-1;
		cid=categoryid;
		search(1);
	}
});