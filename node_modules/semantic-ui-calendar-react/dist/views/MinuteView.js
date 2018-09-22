'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var MINUTE_CALENDAR_ROW_WIDTH = '3';

function MinuteView(props) {
  var minutes = props.minutes,
      hasHeader = props.hasHeader,
      onMinuteClick = props.onMinuteClick,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      hasNextPage = props.hasNextPage,
      hasPrevPage = props.hasPrevPage,
      onHeaderClick = props.onHeaderClick,
      active = props.active,
      currentDate = props.currentDate;

  var headerProps = {
    onHeaderClick: onHeaderClick,
    onNextPageBtnClick: onNextPageBtnClick,
    onPrevPageBtnClick: onPrevPageBtnClick,
    hasNextPage: hasNextPage,
    hasPrevPage: hasPrevPage,
    title: currentDate,
    width: MINUTE_CALENDAR_ROW_WIDTH,
    displayWeeks: false
  };
  return _react2.default.createElement(
    _Calendar2.default,
    null,
    hasHeader && _react2.default.createElement(_Header2.default, headerProps),
    _react2.default.createElement(_Body2.default, {
      width: MINUTE_CALENDAR_ROW_WIDTH,
      data: minutes,
      onCellClick: onMinuteClick,
      active: active })
  );
}

MinuteView.handledProps = ['active', 'currentDate', 'hasHeader', 'hasNextPage', 'hasPrevPage', 'minutes', 'onHeaderClick', 'onMinuteClick', 'onNextPageBtnClick', 'onPrevPageBtnClick'];
MinuteView.propTypes = {
  /** Array of minutes to fill a calendar with. */
  minutes: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  /** Wether to display header or not. */
  hasHeader: _propTypes2.default.bool.isRequired,
  /** Called after click on minute. */
  onMinuteClick: _propTypes2.default.func.isRequired,
  /** Called after click on next page button. */
  onNextPageBtnClick: _propTypes2.default.func,
  /** Called after click on previous page button. */
  onPrevPageBtnClick: _propTypes2.default.func,
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: _propTypes2.default.bool,
  /** Whether to display next page button as active or disabled. */
  hasNextPage: _propTypes2.default.bool,
  /** Called after click on calendar header. */
  onHeaderClick: _propTypes2.default.func,
  /** Minute index to display as active. */
  active: _propTypes2.default.number,
  /** A date that is displayed in calendar header. */
  currentDate: _propTypes2.default.string
};

exports.default = MinuteView;