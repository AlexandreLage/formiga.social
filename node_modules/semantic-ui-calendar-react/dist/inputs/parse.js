'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_FORMAT = undefined;
exports.parseValue = parseValue;
exports.parseArrayOrValue = parseArrayOrValue;
exports.getInitializer = getInitializer;
exports.initialDateToString = initialDateToString;
exports.chooseValue = chooseValue;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIME_FORMAT = exports.TIME_FORMAT = {
  '24': 'HH:mm',
  'AMPM': 'hh:mm A',
  'ampm': 'hh:mm a'
};

/** Parse string, moment, Date.
 * 
 * Return unedfined on invalid input.
 */
function parseValue(value, dateFormat) {
  if (!_lodash2.default.isNil(value) && !_lodash2.default.isNil(dateFormat)) {
    var date = (0, _moment2.default)(value, dateFormat);
    if (date.isValid()) {
      return date;
    }
  }
}

/** Parse string, moment, Date, string[], moment[], Date[].
 * 
 * Return array of moments or moment. Returned value contains only valid moments.
 * Return undefined if none of the input values are valid.
 */
function parseArrayOrValue(data, dateFormat) {
  if (_lodash2.default.isArray(data)) {
    var parsed = _lodash2.default.compact(data.map(function (item) {
      return parseValue(item, dateFormat);
    }));
    if (parsed.length > 0) {
      return parsed;
    }
  }
  return parseValue(data, dateFormat);
}

/** Create moment.
 * 
 * Creates moment using `dateParams` or `initialDate` arguments (if provided).
 * Precedense order: dateParams -> initialDate -> default value
 */
function getInitializer(context /*value, initialDate, dateFormat, dateParams*/) {
  var dateParams = context.dateParams,
      initialDate = context.initialDate,
      dateFormat = context.dateFormat;

  if (dateParams) {
    var parsedParams = (0, _moment2.default)(dateParams);
    if (parsedParams.isValid()) {
      return parsedParams;
    }
  }
  var parsedInitialDate = parseValue(initialDate, dateFormat);
  if (parsedInitialDate) {
    return parsedInitialDate;
  }
  return (0, _moment2.default)();
}

/** Convert value to date string with given date format. */
function initialDateToString(initialDate /* date | Moment | string */, dateFormat) {
  var date = (0, _moment2.default)(initialDate, dateFormat);
  if (date.isValid()) {
    return date.format(dateFormat);
  }
  return '';
}

/** Return initial date if `value` is empty and if `initialDate` provided. */
function chooseValue(value, initialDate) {
  if (value === '' && initialDate) {
    return initialDate;
  }
  return value;
}