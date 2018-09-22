'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEEKS_TO_DISPLAY = exports.DAY_CALENDAR_ROW_WIDTH = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Header = require('./CalendarHeader/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./CalendarBody/Body');

var _Body2 = _interopRequireDefault(_Body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAY_CALENDAR_ROW_WIDTH = exports.DAY_CALENDAR_ROW_WIDTH = '7';
var WEEKS_TO_DISPLAY = exports.WEEKS_TO_DISPLAY = 6;

function DayView(props) {
  var days = props.days,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      onDayClick = props.onDayClick,
      hasNextPage = props.hasNextPage,
      hasPrevPage = props.hasPrevPage,
      currentDate = props.currentDate,
      onHeaderClick = props.onHeaderClick,
      disabled = props.disabled,
      active = props.active;

  return _react2.default.createElement(
    _Calendar2.default,
    null,
    _react2.default.createElement(_Header2.default, {
      width: DAY_CALENDAR_ROW_WIDTH,
      displayWeeks: true,
      onNextPageBtnClick: onNextPageBtnClick,
      onPrevPageBtnClick: onPrevPageBtnClick,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      title: currentDate,
      onHeaderClick: onHeaderClick }),
    _react2.default.createElement(_Body2.default, {
      width: DAY_CALENDAR_ROW_WIDTH,
      data: days,
      onCellClick: onDayClick,
      active: active,
      disabled: disabled })
  );
}

DayView.handledProps = ['active', 'currentDate', 'days', 'disabled', 'hasNextPage', 'hasPrevPage', 'onDayClick', 'onHeaderClick', 'onNextPageBtnClick', 'onPrevPageBtnClick'];
DayView.propTypes = {
  /** An array of dates to fill a calendar with. */
  days: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  /** Called after click on next page button. */
  onNextPageBtnClick: _propTypes2.default.func.isRequired,
  /** Called after click on previous page button. */
  onPrevPageBtnClick: _propTypes2.default.func.isRequired,
  /** Called after click on day. */
  onDayClick: _propTypes2.default.func.isRequired,
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: _propTypes2.default.bool.isRequired,
  /** Whether to display next page button as active or disabled. */
  hasNextPage: _propTypes2.default.bool.isRequired,
  /** A date that is displayed in calendar header. */
  currentDate: _propTypes2.default.string.isRequired,
  /** Called after click on calendar header. */
  onHeaderClick: _propTypes2.default.func,
  /** An array of day positions to display as disabled. */
  disabled: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** Position of a day to display as active. */
  active: _propTypes2.default.number
};

exports.default = DayView;