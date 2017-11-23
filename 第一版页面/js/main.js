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
    /*$('.pagination').on('click', 'li', function(e) {
        var li = $(e.target.closest('li'))
        var lis = li.siblings()
        console.log(e.target.className)
        console.log(li.attr('class').indexOf('prev') <= -1)
        var firstIdx = (lis[1].innerText)*1
        var lastIdx7 = (lis[lis.length-3].innerText)*1
        var lastIdx = (lis[lis.length-2].innerText)*1
        var curIdx = 1
        if(e.target.className.indexOf('morePageNext') <= -1 && 
           li.attr('class').indexOf('prev') <= -1  && 
           li.attr('class').indexOf('next') <= -1  ) {
            lis.removeClass('active')
            li.addClass('active')
            curIdx = li.text()*1
            if(curIdx > 1) {
                $(lis[0]).removeClass('disabled')
            }
        } else if(li.attr('class').indexOf('prev') > -1) {
            lis.removeClass('active')
            $(lis[curIdx-1]).addClass('active')
        }  else if(li.attr('class').indexOf('next') > -1) {
            console.log(curIdx+1)
            lis.removeClass('active')
            $(lis[curIdx+1]).addClass('active')
        } else if(e.target.className.indexOf('morePageNext') > -1) {
            var html = []
            var 余数 = lastIdx % lastIdx7
            if(lastIdx7 + 余数 >= lastIdx) {
                for(var i = firstIdx; i < 余数; i++) {
                    html.push('<li><a href="javascript:;">' + (lastIdx7 + i - firstIdx + 1) + '</a></li>')
                }
                html = html.join(' ')
                $('.pagination').html('<li class="disabled prev"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>' +
                    html+
                    '<li><a href="javascript:;">24</a></li>' +
                    '<li class="next"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>')
            } else {
                for(var i = firstIdx; i < lastIdx7 + 1; i++) {
                    html.push('<li><a href="javascript:;">' + (lastIdx7 + i - firstIdx + 1) + '</a></li>')
                }
                html = html.join(' ')
                $('.pagination').html('<li class="disabled prev"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>' +
                html+
                '<li><a href="javascript:;" class="morePageNext">...</a></li>' +
                '<li><a href="javascript:;">24</a></li>' +
                '<li class="next"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>')
            }
        }
    })*/

    function getActiveNum() {
        var num
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            if(i.className === 'active') {
                num = i.innerText*1
            }
        })
        return num
    }
    var activeNum = getActiveNum()

    function setActive(textNum) {
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            $(i).removeClass('active')
            if($(i).text()*1 === textNum) {
               $(i).addClass('active')
               activeNum = getActiveNum()
            } else if($(i).text()*1 > textNum) {
                $('.pagination ul li').eq(4).addClass('active')
            } else if($(i).text()*1 < textNum) {
                $('.pagination ul li').eq($('.pagination ul li').length-1).addClass('active')
            }
        })
    }

    function addHtml(obj, firstNum, endNum, lastNum, lisCount) {
        var html = []
        for(var i = firstNum; i < endNum + 1; i++) {
            if((endNum + i - firstNum - 3) < lastNum) {
                html.push('<li>' + (endNum + i - firstNum - 3) + '</li>')
            }
        }
        html.push('<li class="morePageNext">...</li>')
        if(firstNum >= (lastNum - lisCount + 1)) {
            html.pop()
        }
        html = html.join(' ')
        obj.html(html+'<li>24</li>')
    }


    $('.pagination').on('click', function(e) {
        var prev = $('.pagination .prev')
        var next = $('.pagination .next')
        var ul = $('.pagination ul')
        var li = $(e.target.closest('li'))
        var ulLis = $(ul.children())
        var lis = li.siblings()
        var firstNum = (ulLis[0].innerText)*1
        var desc3 = (ulLis[ulLis.length-3].innerText)*1
        var lastNum = (ulLis[ulLis.length-1].innerText)*1
            // console.log(firstNum, desc3, lastNum)
        var lisCount = ulLis.length

        if(e.target.tagName === 'LI' && e.target.className != 'morePageNext') {
            var curIdx = li.index()
            var curNum = li.text()*1
            ulLis.removeClass('active').eq(curIdx).addClass('active')
            activeNum = getActiveNum()
            if(curIdx > 0) {
                prev.css({
                    'color': '#333',
                    'cursor': 'pointer',
                })
                prev.removeClass('disabled')
            } else {
                prev.css({
                    'color': '#aaa',
                    'cursor': 'not-allowed'
                })
                prev.addClass('disabled')
            }

            if(curNum === desc3) {
                addHtml(ul, firstNum, desc3, lastNum, lisCount)
            }

            setActive(curNum)
        } else if(e.target.className === 'morePageNext') {
            addHtml(ul, firstNum, desc3, lastNum, lisCount)
            setActive(activeNum)
        }
        
    })


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
