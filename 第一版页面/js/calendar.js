;(function() {
  var div = document.createElement('div')
  div.innerHTML = 
  '<style>'+
    '#calendar {width: 210px; background: #fff; position: absolute; left: 20px; top: 20px; box-shadow: 0 0 15px rgba(0,0,0,.2); border-radius: 4px; overflow: hidden; display: none;'+
      '-webkit-user-select: none;'+
      '-moz-user-select: none;'+
      '-ms-user-select: none;'+
      '-o-user-select: none;'+
      'user-select: none;'+
    '}'+
    '#calendar * {padding: 0; margin: 0; font: inherit; color: inherit; box-sizing: border-box;'+
      '-webkit-overflow-scrolling: touch;'+
    '}'+
    '#calendar .fl {float: left;}'+
    '#calendar .fr {float: right;}'+
    '#calendar .title {text-align: center; background: #eee; border-bottom: 1px solid #ddd; line-height: 2.5em; padding: 0 8px;}'+
    '#calendar .title select {background: none; border: none; line-height: 1.5em;'+
      'outline: none;'+
      '-webkit-appearance: none;'+
    '}'+
    '#calendar .title select.select-year {margin-right: 10px;}'+
    '#calendar .title .prev,'+
    '#calendar .title .next {width: 24px; height: 24px; margin-top: 6px; cursor: pointer; border-radius: 2px; padding-top: 3px; border: 1px solid transparent;}'+
    '#calendar .title .prev:hover,'+
    '#calendar .title .next:hover {background: #ccc; border-color: #aaa;}'+
    '#calendar .title .prev:before,'+
    '#calendar .title .next:before {content: ""; display: block; width: 0; height: 0; border: 8px solid transparent;}'+
    '#calendar .title .prev:before {border-right-color: #333; margin-left: -1px;}'+
    '#calendar .title .next:before {border-left-color: #333; margin-left: 9px;}'+
    '#calendar .days-box {text-align: center; line-height: 28px;}'+
    '#calendar .days-box li {width: 28px; height: 28px; float: left; cursor: pointer; margin: 1px;}'+
    '#calendar .days-box li.past,'+
    '#calendar .days-box li.future {color: #999;}'+
    '#calendar .days-box li:hover {background: #ccc;}'+
    '#calendar .days-box li.on {background: #09f; color: #fff;}'+
    '#calendar .days-box .week {overflow: hidden;}'+
    '#calendar .days-box .days-ul {overflow: hidden;}'+
    '#calendar .days-box .days-ul li {}'+
  '</style>'+
  '<div id="calendar">'+
    '<div class="title">'+
      '<div command="prev" class="prev fl"></div>'+
      '<div command="next" class="next fr"></div>'+
      '<div class="mid">'+
        '<select class="select-year"></select>'+
        '<select class="select-month"></select>'+
      '</div>'+
    '</div>'+
    '<div class="days-box">'+
      '<ul class="week">'+
        '<li class="sun">日</li>'+
        '<li>一</li>'+
        '<li>二</li>'+
        '<li>三</li>'+
        '<li>四</li>'+
        '<li>五</li>'+
        '<li class="sat">六</li>'+
      '</ul>'+
      '<ul class="days-ul"></ul>'+
    '</div>'+
  '</div>'
  document.body.appendChild(div)

  var calendar = document.getElementById('calendar')
  var title = calendar.getElementsByClassName('title')[0]
  var prev = calendar.getElementsByClassName('prev')[0]
  var next = calendar.getElementsByClassName('next')[0]
  var selects = calendar.getElementsByTagName('select')
  var daysUl = document.getElementsByClassName('days-ul')[0]
  var lastInput
  var oDate = new Date()

  selects[1].innerHTML = new Array(12).fill().map(function(_, idx) {
    return '<option value="' + idx + '">' + (idx + 1) + '月</option>'
  }).join('')

  prev.onclick = function(e) {
    oDate.setMonth(oDate.getMonth() - 1)
    fillDays()
  }
  next.onclick = function(e) {
    oDate.setMonth(oDate.getMonth() + 1)
    fillDays()
  }

  selects[0].onchange = function(e) {
    oDate.setFullYear(this.value)
    fillDays()
  }
  selects[1].onchange = function(e) {
    oDate.setMonth(this.value)
    fillDays()
  }

  daysUl.onclick = function(e) {
    if (e.target.tagName.toLowerCase() == 'li') {
      oDate.setDate(e.target.innerHTML)
      lastInput.value = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate()
      calendar.style.display = 'none'
    }
  }

  calendar.onclick = function(e) {
    e.cancelBubble = true
  }

  function fillDays() {
    var sLi = ''

    // 本月
    var curMon = new Date(oDate)//今天
    curMon.setDate(1)//设置为本月1号
    curMon.setMonth(oDate.getMonth() + 1)//(oDate.getMonth() + 1) --> 设置为下月1号
    curMon.setDate(0)//回到本月最后一日

    // 上月
    var prevMon = new Date(oDate)//今天
    prevMon.setDate(1)//设置为本月1号
    var 上月剩余多少天 = prevMon.getDay()//本月1号星期几
    prevMon.setDate(0)// 设置为上月最后一天
    var 上月最后一天 = prevMon.getDate()//获取上月最后一天

    // 下月
    var nextMon = new Date(oDate)//今天
    nextMon.setDate(1)//设置为本月1号
    nextMon.setMonth(oDate.getMonth() + 1)//(oDate.getMonth() + 1) --> 设置为下月1号
    var 下月显示几天 = (7 - nextMon.getDay()) % 7

    sLi += new Array(上月剩余多少天).fill().map(function(_, idx) {
      return '<li class="past">' + (上月最后一天 - (上月剩余多少天 - 1 - idx)) + '</li>'
    }).join('')

    var curDate = oDate.getDate()
    var 今天 = new Date()
    sLi += new Array(curMon.getDate()).fill().map(function(_, idx) {
      return '<li class="' + (今天.getFullYear() == oDate.getFullYear() && 今天.getMonth() == oDate.getMonth() && curDate == idx + 1 ? "on" : "") + '">' + (idx + 1) + '</li>'
    }).join("") 

    sLi += new Array(下月显示几天).fill().map(function(_, idx) {
      return '<li class="future">' + (idx + 1) + '</li>'
    }).join('')

    daysUl.innerHTML = sLi

    var 上下50年 = 100
    var curYear = oDate.getFullYear()
    selects[0].innerHTML = new Array(上下50年).fill().map(function(_, idx) {
      var year = idx - 上下50年 / 2 + curYear
      return '<option value="'+year+'">'+year+'年</option>'
    }).join('')
    selects[0].value = curYear
    selects[1].value = oDate.getMonth()
  }

  ;[].slice.call(document.querySelectorAll('[data-calendar]')).forEach(function(input, idx) {
    input.onclick = function(e) {
      e.cancelBubble = true
      lastInput = input
      oDate = new Date(input.value)
      if (oDate.toString() == 'Invalid Date') {
        oDate = new Date()
      }

      calendar.style.display = 'block'
      input.offsetParent.appendChild(calendar)
      calendar.style.left = input.offsetLeft + 'px'
      calendar.style.top = input.offsetTop + input.offsetHeight + 'px'

      fillDays()
    }
  })

  function addEvent(el, eventName, fn) {
    if (document.addEventListener) {
      el.addEventListener(eventName, fn, false)
    } else {
      el.attachEvent('on' + eventName, fn)
    }
  }

  addEvent(document, 'click', function() {
    calendar.style.display = 'none'
  })
})();