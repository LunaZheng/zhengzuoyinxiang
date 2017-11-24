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
    function getActiveNum() {
        var num
        var ul = $('.pagination ul')
        var ulLis = $(ul.children())
        var lastNum = (ulLis[ulLis.length-1].innerText)*1
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            if(i.className === 'active') {
                num = i.innerText*1
            }
        })

        if(num === 1) {
            $('.pagination .prev').css({
                'color': '#aaa',
                'cursor': 'not-allowed'
            })
            $('.pagination .prev').addClass('disabled')
            $('.pagination .next').css({
                'color': '#333',
                'cursor': 'pointer',
            })
            $('.pagination .next').removeClass('disabled')
        } else if(num === lastNum) {
            $('.pagination .next').css({
                'color': '#aaa',
                'cursor': 'not-allowed'
            })
            $('.pagination .next').addClass('disabled')
            $('.pagination .prev').css({
                'color': '#333',
                'cursor': 'pointer',
            })
            $('.pagination .prev').removeClass('disabled')
        } else {
            $('.pagination .prev').css({
                'color': '#333',
                'cursor': 'pointer',
            })
            $('.pagination .prev').removeClass('disabled')
            $('.pagination .next').css({
                'color': '#333',
                'cursor': 'pointer',
            })
            $('.pagination .next').removeClass('disabled')
        }
        return num
    }

    function getActiveIdx() {
        var num
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            if(i.className === 'active') {
                num = $(i).index()
            }
        })
        return num
    }

    function getMorePageNextIdx() {
        var num
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            if(i.className === 'morePageNext') {
                num = $(i).index()
            }
        })
        return num
    }
    function getMorePagePrevIdx() {
        var num
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            if(i.className === 'morePagePrev') {
                num = $(i).index()
            }
        })
        return num
    }

    var activeNum = getActiveNum()
    var morePageNextNum = getMorePageNextIdx()
    var morePagePrevNum = getMorePagePrevIdx()

    function setActive(curNum) {
        var ul = $('.pagination ul')
        var ulLis = $(ul.children())
        var lastNum = (ulLis[ulLis.length-1].innerText)*1
        var num = curNum || getActiveNum()
        ;[].slice.call($('.pagination ul li')).forEach(function(i) {
            $(i).removeClass('active')
            if($(i).text()*1 === num) {
               $(i).addClass('active')
               activeNum = getActiveNum()
            } /*else if($(i).text()*1 > textNum) {
                $('.pagination ul li').eq(4).addClass('active')
            } else if($(i).text()*1 < textNum) {
                $('.pagination ul li').eq($('.pagination ul li').length-1).addClass('active')
            }*/
        })
    }

    // function addHtml(obj, firstNum, endNum, lastNum, lisCount) {
    function addHtml(obj, start, end, lastNum, lisCount) {
        var html = []
        activeNum = getActiveNum()
        console.log(start, end, lastNum, lisCount)

        if(start < 3 && end <= lisCount) { // 无左右[1 2 3 4 5 6 7 8]
            console.log('无左右')
            for(var i = 1; i <= end; i++) {
                html.push('<li>' + i + '</li>')
            }
        } else if(start < 3 && ((end <= (lastNum - 2)) || (end > lisCount))) { // 无左[1 2 3 4 5 6 7- (... 24)]
            console.log('无左')
            for(var i = 1; i <= end-2; i++) {
                html.push('<li>' + i + '</li>')
            } 
            html.push('<li class="morePageNext">...</li>')
            html.push('<li>' + lastNum + '</li>')
        } else if(start >= 3 && end > lastNum - 2) { // 无右[(1 ...) - 16 17 19 20 21 23 24]
            console.log('无右')
            html.push('<li>1</li>')
            html.push('<li class="morePagePrev">...</li>')
            for(var i = start+2; i <= end; i++) {
                html.push('<li>' + i + '</li>')
            } 
        } else if(start >= 3 && end <= lastNum - 2) { //有左右[(1 ...) - 3 4 5 6 7 8 - (... 24)]
            console.log('有左右')
            html.push('<li>1</li>')
            html.push('<li class="morePagePrev">...</li>')
            for(var i = start/*+2*/; i <= end/*-2*/; i++) {
                html.push('<li>' + i + '</li>')
            }
            html.push('<li class="morePageNext">...</li>')
            html.push('<li>' + lastNum + '</li>')
        }
        html = html.join(' ')
        obj.html(html)
        
    }


    $('.pagination').on('click', function(e) {
        var prev = $('.pagination .prev')
        var next = $('.pagination .next')
        var ul = $('.pagination ul')
        var li = $(e.target.closest('li'))
        var ulLis = $(ul.children())
        var lis = $(ul.children())
        morePageNextNum != undefined && lis.splice(morePageNextNum, 1)
        morePagePrevNum != undefined && lis.splice(morePagePrevNum, 1)
        /*var firstNum
        if(morePagePrevNum != undefined) {
            lis.splice(morePagePrevNum, 1)
            firstNum = (lis[1].innerText)*1
        } else {
            firstNum = (lis[0].innerText)*1
        }*/
        // var firstNum = (ulLis[0].innerText)*1
        var desc3 = (ulLis[ulLis.length-3].innerText)*1
        var lastNum = (ulLis[ulLis.length-1].innerText)*1
            // console.log(firstNum, desc3, lastNum)
        var lisCount = ulLis.length

        if(e.target.tagName === 'LI' && e.target.className != 'morePageNext') {
            var curIdx = li.index()
            var curNum = li.text()*1
            if(curNum === activeNum) {
                return
            }
            ulLis.removeClass('active').eq(curIdx).addClass('active')
            activeNum = getActiveNum()
            /*if(curNum === desc3) { // 点击 ... 前
                //addHtml(ul, firstNum, desc3, lastNum, lisCount)
                // addHtml(ul, firstNum, lis.length - 2, lastNum, lisCount)
            }
            if(curNum === 1 || curNum === 2) { // 点击 ... 前
                //addHtml(ul, firstNum, desc3, lastNum, lisCount)
                // addHtml(ul, firstNum, lis.length - 2, lastNum, lisCount)
            }*/
            morePageNextNum = getMorePageNextIdx()
            morePagePrevNum = getMorePagePrevIdx()
            /*if(morePagePrevNum != undefined && activeNum === $(ulLis[morePagePrevNum + 1]).text()*1) {
                console.log('11111111')
            }*/

            if(activeNum === 1) {
                addHtml(ul, 1, ulLis.length, lastNum, ulLis.length-2)
            } else if(activeNum === lastNum) {
                addHtml(ul, lastNum-ulLis.length+2, lastNum, lastNum, ulLis.length-2)
            } else if(morePagePrevNum != undefined && 
                activeNum === $(ulLis[morePagePrevNum + 1]).text()*1 && 
                morePageNextNum === undefined) { // 无右... 点击...后一个
                addHtml(ul, activeNum-ulLis.length+6, activeNum+2, lastNum, ulLis.length-2)
            } else if(morePageNextNum != undefined && 
                activeNum === $(ulLis[morePageNextNum - 1]).text()*1 && 
                morePagePrevNum === undefined) { // 无左... 点击...前一个
                addHtml(ul, activeNum-parseInt(ulLis.length/2) + 2, activeNum+parseInt(ulLis.length/2)- 1, lastNum, ulLis.length-2)
            } else if(morePagePrevNum != undefined && 
                activeNum === $(ulLis[morePagePrevNum + 1]).text()*1 && 
                morePageNextNum != undefined) { // 有 左右... 点击 左
                if(activeNum-parseInt(ulLis.length/2) + 2 < 3) {
                    console.log('--------')
                    addHtml(ul, 1, 1+ ulLis.length-2, lastNum, ulLis.length-2)
                } else {
                    addHtml(ul, activeNum-parseInt(ulLis.length/2)+ 2, activeNum+parseInt(ulLis.length/2)- 3, lastNum, ulLis.length-2)
                }
            } else if(morePagePrevNum != undefined && 
                activeNum === $(ulLis[morePageNextNum - 1]).text()*1 && 
                morePageNextNum != undefined) { // 有 左右... 点击 右
                if(activeNum+parseInt(ulLis.length/2)- 2 > lastNum-3) {
                    addHtml(ul, lastNum-ulLis.length+2, lastNum, lastNum, ulLis.length-2)
                } else {
                    addHtml(ul, activeNum-parseInt(ulLis.length/2) + 3, activeNum+parseInt(ulLis.length/2)- 2, lastNum, ulLis.length-2)
                }
            } else if(activeNum === getMorePageNextIdx()) {
                addHtml(ul, lastNum-ulLis.length, lastNum, lastNum, ulLis.length-2)
            }
            setActive(activeNum)
        } /*else if(e.target.className === 'morePageNext') {
            //addHtml(ul, firstNum, desc3, lastNum, lisCount)
            // addHtml(ul, firstNum, lis.length - 2, lastNum, lisCount)
            setActive(activeNum)
        }*/ else if(e.target.className.indexOf('prev') > -1) {
            if(activeNum != 1) {
                var activeIdx = getActiveIdx()
                console.log(morePagePrevNum, activeIdx)
                $(lis[activeIdx-1]).removeClass('active')
                $(lis[activeIdx-2]).addClass('active')
                activeNum = getActiveNum()
            }
        } else if(e.target.className.indexOf('next') > -1) {
            if(activeNum != lastNum) {
                var activeIdx = getActiveIdx()
                $(lis[activeIdx-1]).removeClass('active')
                $(lis[activeIdx]).addClass('active')
                activeNum = getActiveNum()
            }
            if(activeNum === desc3) {
                //addHtml(ul, firstNum, desc3, lastNum, lisCount)
                // addHtml(ul, firstNum, lis.length - 2, lastNum, lisCount)
            }
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
