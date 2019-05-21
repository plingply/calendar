class calendar {
    constructor(time = new Date(), type = 'month', week = 0) {
        if (week != 0 && week != 1) {
            console.error("星期必须传1或0，0代表星期天")
            return
        }
        this.time = new Date(time)
        this.year = null
        this.month = null
        this.day = 0
        this.type = type
        this.week = week
        this.resultArr = []
        this.init()
    }

    init() {

        this.year = this.time.getFullYear()
        this.month = this.time.getMonth()
        this.getDateCount()
    }

    getDateCount() {
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

    getData() {
        let first = new Date(this.year, this.month, 1).getDay()
        if (this.week === 1) {
            first = first === 0 ? 7 : first
        }
        this.resultArr = []
        let week = this.week
        for (let i = this.week; i < 42; i++) {

            if (this.week === 1) {
                week = week > 7 ? 1 : week
            } else {
                week = week > 6 ? 0 : week
            }
            let weeks = week === 0 ? 7 : week

            if (i < first) {
                this.resultArr.push({
                    isCurrentMonth: false
                })
            } else if (i > this.day + first - this.week) {
                this.resultArr.push({
                    isCurrentMonth: false
                })
            } else {
                let day = i - first + 1
                day = day < 10 ? ('0' + day) : day + ''
                let month = this.month + 1
                month = month < 10 ? ('0' + month) : month + ''
                this.resultArr.push({
                    day,
                    month,
                    year: this.year + '',
                    week: weeks,
                    isCurrentMonth: true
                })
            }

            week++
        }
        this.resultArr = this.resultArr[35].isCurrentMonth ? this.resultArr : this.resultArr.splice(0, 35)
        return this.resultArr
    }
}

export default calendar
