'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTimeStringWithSuffix = buildTimeStringWithSuffix;
exports.isNextPageAvailable = isNextPageAvailable;
exports.isPrevPageAvailable = isPrevPageAvailable;
exports.getCurrentDate = getCurrentDate;
function buildTimeStringWithSuffix(hour /*string*/
, minute /*string*/
, timeFormat /*string*/) {
  if (timeFormat === 'ampm') {
    if (parseInt(hour) < 12) {
      return convertHourTo_12_Format(hour) + ':' + minute + ' am';
    }
    return convertHourTo_12_Format(hour) + ':' + minute + ' pm';
  }
  if (timeFormat === 'AMPM') {
    if (parseInt(hour) < 12) {
      return convertHourTo_12_Format(hour) + ':' + minute + ' AM';
    }
    return convertHourTo_12_Format(hour) + ':' + minute + ' PM';
  }
  return hour + ':' + minute;
}

function convertHourTo_12_Format(hour /*string*/) {
  if (hour === '00' || hour === '12') {
    return '12';
  }
  if (parseInt(hour) < 12) {
    return hour;
  }
  var h = (parseInt(hour) - 12).toString();
  if (h.length === 1) {
    return '0' + h;
  }
  return h;
}

function isNextPageAvailable(date /*Moment*/, maxDate /*Moment*/) {
  if (maxDate) {
    return maxDate.isAfter(date, 'day');
  }
  return true;
}

function isPrevPageAvailable(date /*Moment*/, minDate /*Moment*/) {
  if (minDate) {
    return minDate.isBefore(date, 'day');
  }
  return true;
}

function getCurrentDate(date /*Moment*/) {
  return date.format('MMMM DD, YYYY');
}