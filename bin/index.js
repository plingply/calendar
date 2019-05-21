/**
 * calendar 1.0.0
 * created at Tue May 21 2019 13:16:55 GMT+0800 (GMT+08:00)
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
      function calendar() {
          var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
          var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'month';
          var week = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          classCallCheck(this, calendar);

          if (week != 0 && week != 1) {
              console.error("星期必须传1或0，0代表星期天");
              return;
          }
          this.time = new Date(time);
          this.year = null;
          this.month = null;
          this.day = 0;
          this.type = type;
          this.week = week;
          this.resultArr = [];
          this.init();
      }

      createClass(calendar, [{
          key: 'init',
          value: function init() {

              this.year = this.time.getFullYear();
              this.month = this.time.getMonth();
              this.getDateCount();
          }
      }, {
          key: 'getDateCount',
          value: function getDateCount() {
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
          key: 'getData',
          value: function getData() {
              var first = new Date(this.year, this.month, 1).getDay();
              if (this.week === 1) {
                  first = first === 0 ? 7 : first;
              }
              this.resultArr = [];
              var week = this.week;
              for (var i = this.week; i < 42; i++) {

                  if (this.week === 1) {
                      week = week > 7 ? 1 : week;
                  } else {
                      week = week > 6 ? 0 : week;
                  }
                  var weeks = week === 0 ? 7 : week;

                  if (i < first) {
                      this.resultArr.push({
                          isCurrentMonth: false
                      });
                  } else if (i > this.day + first - this.week) {
                      this.resultArr.push({
                          isCurrentMonth: false
                      });
                  } else {
                      var day = i - first + 1;
                      day = day < 10 ? '0' + day : day + '';
                      var month = this.month + 1;
                      month = month < 10 ? '0' + month : month + '';
                      this.resultArr.push({
                          day: day,
                          month: month,
                          year: this.year + '',
                          week: weeks,
                          isCurrentMonth: true
                      });
                  }

                  week++;
              }
              this.resultArr = this.resultArr[35].isCurrentMonth ? this.resultArr : this.resultArr.splice(0, 35);
              return this.resultArr;
          }
      }]);
      return calendar;
  }();

  return calendar;

}));
