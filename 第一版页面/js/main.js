$(document).ready(function(){
//    nav-li hover e
    var num;
    $('.nav-main>li[id]').hover(function(){
       /*图标向上旋转*/
        $(this).children().removeClass().addClass('hover-up');
        /*下拉框出现*/
        var Obj = $(this).attr('id');
        num = Obj.substring(3, Obj.length);
        $('#box-'+num).slideDown(300);
    },function(){
        /*图标向下旋转*/
        $(this).children().removeClass().addClass('hover-down');
        /*下拉框消失*/
        $('#box-'+num).hide();
    });
//    hidden-box hover e
    $('.hidden-box').hover(function(){
        /*保持图标向上*/
        $('#li-'+num).children().removeClass().addClass('hover-up');
        $(this).show();
    },function(){
        $(this).slideUp(200);
        $('#li-'+num).children().removeClass().addClass('hover-down');
    });

    /* ----------------- 蓉 ----------------- */
    // select 框
    $('.btn-group').on('click', 'a', function(e) {
        $(e.delegateTarget.children[0]).html($(e.target).text() + '<span class="caret-box"><i class="caret"></i></span>')
        // 选择后的值
        console.log($(e.target).text())
    })

    // 复选框
    $('table').on('click', 'label', function(e) {
        var label = $(e.target.closest('label'))
        var labels = $('label.checkbox')

        if(label[0].innerText === '全选') {
            labels.toggleClass('on')
            if(labels[0].className.indexOf('on') > -1) {
                labels.addClass('on')
            } else {
                labels.removeClass('on')
            }
        } else {
            label.toggleClass('on')
        }
        $(labels[labels.length-1]).removeClass('on')
        $(labels[labels.length-2]).removeClass('on')
    })

    // 分页栏
    /*$('.pagination').on('click', 'a', function(e) {
        var li = $(e.target.closest('li'))
        var lis = li.siblings()
        if(e.target.className.indexOf('morePage') <= -1 && 
           e.target.className.indexOf('prev') <= -1  && 
           e.target.className.indexOf('next') <= -1  ) {
            lis.removeClass('active')
            li.addClass('active')
        } else if(e.target.className.indexOf('morePage') > -1) {
            for(var i = 1, len = lis.length-2; i < len; i++) {
                var lastPageNum = $(lis[len-3].children[0]).html()*1
                $(lis[i].children[0]).html(lastPageNum+i*1)
            } 
        }
    })*/

    /*$('.pagination').each(function(i) {
      var cons = tabCon.eq(i).children()
      var btns = $(this.children)
      btns.on('click', function() {
        var index = $(this).index()
        btns.removeClass('on').eq(index).addClass('on')
        cons.hide().eq(index).show()
      })
    })*/
});
