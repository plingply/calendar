class calendar {
    constructor(obj) {

        /**
         * time 可以别new Date() 格式化的格式
         * type month 月 week 周
         * week 1：从星期一开始 0 从星期天开始
         */

        if (obj.time && typeof obj.time == 'string') {
            if (Number(obj.time)) {
                obj.time = Number(obj.time)
            } else {
                console.error("请传入可以被new Date() 解析的时间格式")
                return {}
            }
        }

        let time = obj.time ? obj.time : new Date()
        let type = obj.type ? obj.type : 'month'
        let week = obj.week ? obj.week : 1

        if (new Date(time).toString() === 'Invalid Date') {
            console.error("请传入可以被new Date() 解析的时间格式")
            return {}
        }

        if (type != 'month' && type != 'week') {
            console.error("type 必须为：week 或者 month")
            return {}
        }

        if (week != 0 && week != 1) {
            console.error("星期必须传1或0，0代表星期天")
            return {}
        }

        this.time = new Date(time)
        this.year = null
        this.month = null
        this.day = 0
        this.type = type
        this.week = week
        this.resultArr = []
        this._init()
    }

    _init() {

        this.year = this.time.getFullYear()
        this.month = this.time.getMonth()
        this._getDateCount()
    }

    _getDateCount() {
        let tepMonth = this.month + 1
        let nextMonth = 0
        let nextYear = 0
        let nextTime = 0
        if (tepMonth > 11) {
            nextMonth = 0
            nextYear = this.year + 1
        } else {
            nextMonth = tepMonth
            nextYear = this.year
        }
        nextTime = new Date(nextYear, nextMonth, 1) - 1
        this.day = new Date(nextTime).getDate()
    }

    init() {
        if (this.type == 'month') {
            return this._getMonthData()
        }
    }

    _getMonthData() {

        let first = new Date(this.year, this.month, 1).getDay()
        if (this.week === 1) {
            first = first === 0 ? 7 : first
        }
        this.resultArr = []
        let week = this.week
        let nextday = 0
        for (let i = this.week; i < 42; i++) {

            if (this.week === 1) {
                week = week > 7 ? 1 : week
            } else {
                week = week > 6 ? 0 : week
            }
            let weeks = week === 0 ? 7 : week
            weeks = weeks + ''
            let isCurrentMonth = false
            let day, month, year

            if (i < first) {
                let prewtime = new Date(new Date(this.year, this.month, 1).getTime() - 1000 * 3600 * 24 * (first - i))
                day = prewtime.getDate()
                month = prewtime.getMonth() + 1
                year = prewtime.getFullYear()
                day = day < 10 ? ('0' + day) : day + ''
                month = month < 10 ? ('0' + month) : month + ''
                isCurrentMonth = false
            } else if (i > this.day + first - 1) {
                day = nextday++ + 1
                day = day < 10 ? ('0' + day) : day + ''
                month = this.month + 2
                year = this.year
                if (month > 12) {
                    month = 1
                    year = year + 1
                }
                month = month < 10 ? ('0' + month) : month + ''
                isCurrentMonth = false
            } else {
                day = i - first + 1
                day = day < 10 ? ('0' + day) : day + ''
                month = this.month + 1
                month = month < 10 ? ('0' + month) : month + ''
                year = this.year + ''
            }

            let isToday = false
            if (parseInt(new Date(year, month - 1, day).setHours(0, 0, 0)/1000) === parseInt(this.time.setHours(0, 0, 0)/1000)) {
                isToday = true
            }

            this.resultArr.push({
                day,
                month,
                year,
                week: weeks,
                isCurrentMonth,
                isToday
            })

            week++
        }

        this.resultArr = this.resultArr[35].isCurrentMonth ? this.resultArr : this.resultArr.splice(0, 35)
        let month = this.month + 1
        month = month < 10 ? '0' + month : month + ''
        let weekArr = this.week == '1' ? [1, 2, 3, 4, 5, 6, 7] : [7, 1, 2, 3, 4, 5, 6]
        return {
            year: this.year + '',
            month: month,
            week: weekArr,
            item: this.resultArr
        }
    }

    prew() {
        this.month--
        if (this.month < 0) {
            this.month = 11
            this.year--
        }
        this._getDateCount()
        return this._getMonthData()
    }

    next() {
        this.month++
        if (this.month > 11) {
            this.month = 0
            this.year++
        }
        this._getDateCount()
        return this._getMonthData()
    }
}

export default calendar
