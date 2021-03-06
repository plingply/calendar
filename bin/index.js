/**
 * calendar 1.0.8
 * created at Mon Dec 16 2019 22:10:09 GMT+0800 (CST)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.calendar = factory());
}(this, function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var calendar = function () {
      function calendar(obj) {
          classCallCheck(this, calendar);


          /**
           * time 可以别new Date() 格式化的格式
           * type month 月 week 周
           * week 1：从星期一开始 0 从星期天开始
           */

          if (obj.time && typeof obj.time == 'string') {
              if (Number(obj.time)) {
                  obj.time = Number(obj.time);
              } else {
                  console.error("请传入可以被new Date() 解析的时间格式");
                  return {};
              }
          }

          var time = obj.time ? obj.time : new Date();
          var type = obj.type ? obj.type : 'month';
          var week = obj.week;
          if (week != 0 && week != 1) {
              week = 1;
          }
          if (new Date(time).toString() === 'Invalid Date') {
              console.error("请传入可以被new Date() 解析的时间格式");
              return {};
          }

          if (type != 'month' && type != 'week') {
              console.error("type 必须为：week 或者 month");
              return {};
          }

          if (week != 0 && week != 1) {
              console.error("星期必须传1或0，0代表星期天");
              return {};
          }

          this.time = new Date(time);
          this.weektime = new Date(time);
          this.year = null;
          this.month = null;
          this.day = 0;
          this.type = type;
          this.week = Number(week);
          this.resultArr = [];
          this._init();
      }

      createClass(calendar, [{
          key: '_init',
          value: function _init() {

              if (this.type == 'month') {
                  this.year = this.time.getFullYear();
                  this.month = this.time.getMonth();
                  this._getDateCount();
              }

              if (this.type == 'week') {
                  this.day = 0;
              }
          }
      }, {
          key: '_getDateCount',
          value: function _getDateCount() {
              var tepMonth = this.month + 1;
              var nextMonth = 0;
              var nextYear = 0;
              var nextTime = 0;
              if (tepMonth > 11) {
                  nextMonth = 0;
                  nextYear = this.year + 1;
              } else {
                  nextMonth = tepMonth;
                  nextYear = this.year;
              }
              nextTime = new Date(nextYear, nextMonth, 1) - 1;
              this.day = new Date(nextTime).getDate();
          }
      }, {
          key: 'init',
          value: function init() {
              if (this.type == 'month') {
                  return this._getMonthData();
              }

              if (this.type == 'week') {
                  return this._getWeekData();
              }
          }
      }, {
          key: '_getMonthData',
          value: function _getMonthData() {

              var first = new Date(this.year, this.month, 1).getDay();
              if (this.week === 1) {
                  first = first === 0 ? 7 : first;
              }
              this.resultArr = [];
              var week = this.week;
              var nextday = 0;
              for (var i = this.week; i <= 42; i++) {

                  if (this.week === 1) {
                      week = week > 7 ? 1 : week;
                  } else {
                      week = week > 6 ? 0 : week;
                  }
                  var weeks = week === 0 ? 7 : week;
                  weeks = weeks + '';
                  var isCurrentMonth = false;
                  var day = void 0,
                      _month = void 0,
                      year = void 0;

                  if (i < first) {
                      var prewtime = new Date(new Date(this.year, this.month, 1).getTime() - 1000 * 3600 * 24 * (first - i));
                      day = prewtime.getDate();
                      _month = prewtime.getMonth() + 1;
                      year = prewtime.getFullYear();
                      day = day < 10 ? '0' + day : day + '';
                      _month = _month < 10 ? '0' + _month : _month + '';
                      isCurrentMonth = false;
                  } else if (i > this.day + first - 1) {
                      day = nextday++ + 1;
                      day = day < 10 ? '0' + day : day + '';
                      _month = this.month + 2;
                      year = this.year;
                      if (_month > 12) {
                          _month = 1;
                          year = year + 1;
                      }
                      _month = _month < 10 ? '0' + _month : _month + '';
                      isCurrentMonth = false;
                  } else {
                      day = i - first + 1;
                      day = day < 10 ? '0' + day : day + '';
                      _month = this.month + 1;
                      _month = _month < 10 ? '0' + _month : _month + '';
                      year = this.year + '';
                      isCurrentMonth = true;
                  }

                  var isCurrentToday = false;
                  if (parseInt(new Date(year, _month - 1, day).setHours(0, 0, 0) / 1000) === parseInt(this.time.setHours(0, 0, 0) / 1000)) {
                      isCurrentToday = true;
                  }

                  this.resultArr.push({
                      day: day,
                      month: _month,
                      year: year,
                      week: weeks,
                      isCurrentMonth: isCurrentMonth,
                      isCurrentToday: isCurrentToday
                  });

                  week++;
              }

              this.resultArr = this.resultArr[35].isCurrentMonth ? this.resultArr : this.resultArr.splice(0, 35);
              var month = this.month + 1;
              month = month < 10 ? '0' + month : month + '';
              var weekArr = this.week == '1' ? [1, 2, 3, 4, 5, 6, 7] : [7, 1, 2, 3, 4, 5, 6];
              return {
                  year: this.year + '',
                  month: month,
                  week: weekArr,
                  item: this.resultArr
              };
          }
      }, {
          key: '_getWeekData',
          value: function _getWeekData() {

              this.weektime = new Date(this.time.getTime() + this.day * 1000 * 3600 * 24 * 7);

              var first = this.weektime.getDay();
              var oneDay = 1000 * 3600 * 24;
              var nowTime = this.weektime.getTime();

              if (this.week == 1) {
                  first = first === 0 ? 7 : first;
              }
              this.resultArr = [];
              var month = void 0,
                  year = void 0,
                  day = void 0;

              for (var i = this.week; i < 7 + this.week; i++) {
                  var ctime = nowTime - (first - i) * oneDay;
                  day = new Date(ctime).getDate();
                  day = day < 10 ? '0' + day : day + '';
                  month = new Date(ctime).getMonth() + 1;
                  month = month < 10 ? '0' + month : month + '';
                  year = new Date(ctime).getFullYear() + '';

                  var isCurrentMonth = false;
                  var isCurrentToday = false;

                  var fullYear = this.time.getFullYear();
                  var fullMonth = this.time.getMonth();
                  var fullDay = this.time.getDate();

                  if (fullYear == year && fullMonth == month - 1) {
                      isCurrentMonth = true;
                      if (fullDay == day) {
                          isCurrentToday = true;
                      }
                  }
                  this.resultArr.push({
                      day: day,
                      month: month,
                      year: year,
                      week: i == 0 ? 7 : i,
                      isCurrentMonth: isCurrentMonth,
                      isCurrentToday: isCurrentToday
                  });
              }

              var weekArr = this.week == '1' ? [1, 2, 3, 4, 5, 6, 7] : [7, 1, 2, 3, 4, 5, 6];
              return {
                  week: weekArr,
                  item: this.resultArr
              };
          }
      }, {
          key: 'prew',
          value: function prew() {

              if (this.type == 'month') {
                  this.month--;
                  if (this.month < 0) {
                      this.month = 11;
                      this.year--;
                  }
                  this._getDateCount();
                  return this._getMonthData();
              }

              if (this.type == 'week') {
                  this.day--;
                  return this._getWeekData();
              }
          }
      }, {
          key: 'next',
          value: function next() {
              if (this.type == 'month') {
                  this.month++;
                  if (this.month > 11) {
                      this.month = 0;
                      this.year++;
                  }
                  this._getDateCount();
                  return this._getMonthData();
              }
              if (this.type == 'week') {
                  this.day++;
                  return this._getWeekData();
              }
          }
      }]);
      return calendar;
  }();

  return calendar;

}));
