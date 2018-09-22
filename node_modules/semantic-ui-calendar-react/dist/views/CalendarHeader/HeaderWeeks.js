'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Return array of week day names.
 * 
 * getWeekDays() --> ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Su']
 */
var getWeekDays = function getWeekDays(moment) {
  var weekDays = [];
  var day = moment().startOf('week');
  for (var i = 0; i < 7; i++) {
    weekDays[i] = day.format('dd');
    day.add(1, 'd');
  }
  return weekDays;
};

var cellStyle = {
  border: 'none',
  borderBottom: '1px solid rgba(34,36,38,.1)'
};

var getWeekDayCells = function getWeekDayCells(moment) {
  return getWeekDays(moment).map(function (weekDay) {
    return _react2.default.createElement(
      _semanticUiReact.Table.HeaderCell,
      {
        key: weekDay,
        style: cellStyle,
        colSpan: '1' },
      weekDay
    );
  });
};

getWeekDayCells.handledProps = [];
function HeaderWeeks() {
  return _react2.default.createElement(
    _semanticUiReact.Table.Row,
    null,
    getWeekDayCells(_moment2.default)
  );
}

HeaderWeeks.handledProps = [];
exports.default = HeaderWeeks;