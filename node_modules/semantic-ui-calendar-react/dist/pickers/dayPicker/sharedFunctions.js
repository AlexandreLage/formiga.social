'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDays = buildDays;
exports.getBrakepoints = getBrakepoints;
exports.getDefaultEnabledDayPositions = getDefaultEnabledDayPositions;
exports.getDisabledDays = getDisabledDays;
exports.isNextPageAvailable = isNextPageAvailable;
exports.isPrevPageAvailable = isPrevPageAvailable;
exports.getDaysArray = getDaysArray;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Build days to fill page. */
function buildDays(date /*moment*/, daysOnPage /*number*/) {
  var start = date.clone().startOf('month').startOf('week');
  return getDaysArray(start.date(), getBrakepoints(date), daysOnPage).map(function (date) {
    return date.toString();
  });
}

/** Return dates from ends of months.
 * 
 * On one datepicker's page not only days from current month are displayed
 * but also some days from adjacent months. This function returns days
 * that separate one month from other (last day in month).
 * Return array of one or two numbers.
 */
function getBrakepoints(date /*moment*/) {
  var dateClone = date.clone();
  var currentMonth = dateClone.month();
  var brakepoints = [];

  dateClone.startOf('month').startOf('week');
  if (dateClone.month() !== currentMonth) {
    brakepoints.push(dateClone.endOf('month').date());
    dateClone.add(1, 'month');
  }
  brakepoints.push(dateClone.endOf('month').date());
  return brakepoints;
}

/* Return array of day positions that are not disabled by default. */
function getDefaultEnabledDayPositions(allDays /*string[]*/, date /*moment*/) {
  var dateClone = date.clone();
  var brakepoints = getBrakepoints(dateClone);
  if (brakepoints.length === 1) {
    return _lodash2.default.range(0, _lodash2.default.indexOf(allDays, brakepoints[0].toString()) + 1);
  } else {
    return _lodash2.default.range(_lodash2.default.indexOf(allDays, brakepoints[0].toString()) + 1, _lodash2.default.lastIndexOf(allDays, brakepoints[1].toString()) + 1);
  }
}

/** Return day positions that shoud be displayed as disabled. */
function getDisabledDays(disable, maxDate, minDate, currentDate, daysOnPage, enable) {
  var dayPositions = _lodash2.default.range(daysOnPage);
  var daysInCurrentMonthPositions = getDefaultEnabledDayPositions(buildDays(currentDate, daysOnPage), currentDate);
  var disabledDays = dayPositions.filter(function (dayPosition) {
    return !_lodash2.default.includes(daysInCurrentMonthPositions, dayPosition);
  });
  if (_lodash2.default.isArray(enable)) {
    var enabledDaysPositions = enable.filter(function (date) {
      return date.isSame(currentDate, 'month');
    }).map(function (date) {
      return date.date();
    }).map(function (date) {
      return daysInCurrentMonthPositions[date - 1];
    });
    disabledDays = _lodash2.default.concat(disabledDays, dayPositions.filter(function (position) {
      return !_lodash2.default.includes(enabledDaysPositions, position);
    }));
  }
  if (_lodash2.default.isArray(disable)) {
    disabledDays = _lodash2.default.concat(disabledDays, disable.filter(function (date) {
      return date.isSame(currentDate, 'month');
    }).map(function (date) {
      return date.date();
    }).map(function (date) {
      return daysInCurrentMonthPositions[date - 1];
    }));
  }
  if (!_lodash2.default.isNil(maxDate)) {
    if (maxDate.isBefore(currentDate, 'month')) {
      disabledDays = dayPositions;
    }
    if (maxDate.isSame(currentDate, 'month')) {
      disabledDays = _lodash2.default.concat(disabledDays, _lodash2.default.range(1, daysInCurrentMonthPositions.length + 1).filter(function (date) {
        return date > maxDate.date();
      }).map(function (date) {
        return daysInCurrentMonthPositions[date - 1];
      }));
    }
  }
  if (!_lodash2.default.isNil(minDate)) {
    if (minDate.isAfter(currentDate, 'month')) {
      disabledDays = dayPositions;
    }
    if (minDate.isSame(currentDate, 'month')) {
      disabledDays = _lodash2.default.concat(disabledDays, _lodash2.default.range(1, daysInCurrentMonthPositions.length + 1).filter(function (date) {
        return date < minDate.date();
      }).map(function (date) {
        return daysInCurrentMonthPositions[date - 1];
      }));
    }
  }
  return _lodash2.default.sortBy(_lodash2.default.uniq(disabledDays).filter(function (day) {
    return !_lodash2.default.isNil(day);
  }));
}

function isNextPageAvailable(date, maxDate) {
  if (_lodash2.default.isNil(maxDate)) return true;
  if (date.isSameOrAfter(maxDate, 'month')) return false;
  return true;
}

function isPrevPageAvailable(date, minDate) {
  if (_lodash2.default.isNil(minDate)) return true;
  if (date.isSameOrBefore(minDate, 'month')) return false;
  return true;
}

// helper
function getDaysArray(start /*number*/, brakepoints /*number[]*/, length) {
  var currentDay = start;
  var days = [];
  var brakepointsLeft = brakepoints.slice();

  while (!(days.length === length)) {
    days.push(currentDay);
    var bp = _lodash2.default.first(brakepointsLeft);
    if (currentDay === bp) {
      currentDay = 1;
      brakepointsLeft = _lodash2.default.slice(brakepointsLeft, 1);
    } else {
      currentDay = currentDay + 1;
    }
  }
  return days;
}