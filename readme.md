c-calendar

`javascript
    安装 npm install c-calendar --save

    let calendar = require('c-calendar')
    import calendar from 'c-calendar'

    // 浏览器直接引用
    let calendar = calendar({
        time: new Date(),
        type: 'month',
        week: '1'
    })

    calendar.init() // return 时间数组
    calendar.prew() // 上一个月 return 时间数组
    calendar.next() // 下一个月 return 时间数组

    /*
        time: 可以被new Date()解析的时间
        type: month 和 week week返回一个礼拜的时间 
        week 1表示从星期1开始 0表示从星期天开始
    */

    返回数据 一个数组，上月剩余天数，和下月天数加上本月天数

    {
        day, // 天
        month, // 月
        year, // 年
        week, // 星期
        isCurrentMonth, // 是否是当月
        isCurrentToday // 是否是传入的当天
    }
`