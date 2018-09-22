'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Header = require('./CalendarHeader/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./CalendarBody/Body');

var _Body2 = _interopRequireDefault(_Body);

var _DayView = require('./DayView');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAY_POSITIONS = _lodash2.default.range(_DayView.WEEKS_TO_DISPLAY * 7);

function getActive(start, end) {
  if (_lodash2.default.isNil(start) && _lodash2.default.isNil(end)) return;
  if (!_lodash2.default.isNil(start) && _lodash2.default.isNil(end)) {
    return start;
  }
  if (!_lodash2.default.isNil(start) && !_lodash2.default.isNil(end)) {
    return DAY_POSITIONS.slice(start, end + 1);
  }
}

function DatesRangeView(props) {
  var days = props.days,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      onDayClick = props.onDayClick,
      hasPrevPage = props.hasPrevPage,
      hasNextPage = props.hasNextPage,
      currentDate = props.currentDate,
      onHeaderClick = props.onHeaderClick,
      active = props.active,
      disabled = props.disabled,
      selectedRange = props.selectedRange;
  var start = active.start,
      end = active.end;

  return _react2.default.createElement(
    _Calendar2.default,
    null,
    _react2.default.createElement(_Header2.default, {
      width: _DayView.DAY_CALENDAR_ROW_WIDTH,
      displayWeeks: true,
      rangeRowContent: selectedRange,
      onNextPageBtnClick: onNextPageBtnClick,
      onPrevPageBtnClick: onPrevPageBtnClick,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      title: currentDate,
      onHeaderClick: onHeaderClick }),
    _react2.default.createElement(_Body2.default, {
      width: _DayView.DAY_CALENDAR_ROW_WIDTH,
      data: days,
      onCellClick: onDayClick,
      active: getActive(start, end),
      disabled: disabled })
  );
}

DatesRangeView.handledProps = ['active', 'currentDate', 'days', 'disabled', 'hasNextPage', 'hasPrevPage', 'onDayClick', 'onHeaderClick', 'onNextPageBtnClick', 'onPrevPageBtnClick', 'selectedRange'];
DatesRangeView.propTypes = {
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
  /** Date that is displayed in calendar header. */
  currentDate: _propTypes2.default.string.isRequired,
  /** Selected range that is displayed in calendar header. */
  selectedRange: _propTypes2.default.string.isRequired,
  /** Start and end of a range of day positions to display as active. */
  active: _propTypes2.default.shape({
    start: _propTypes2.default.number,
    end: _propTypes2.default.number
  }).isRequired,
  /** Called after click on calendar header. */
  onHeaderClick: _propTypes2.default.func,
  /** An array of day positions to display as disabled. */
  disabled: _propTypes2.default.arrayOf(_propTypes2.default.number)
};

DatesRangeView.defaultProps = {
  active: {
    start: undefined,
    end: undefined
  }
};

exports.default = DatesRangeView;