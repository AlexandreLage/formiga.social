'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Header = require('./CalendarHeader/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./CalendarBody/Body');

var _Body2 = _interopRequireDefault(_Body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOUR_CALENDAR_ROW_WIDTH = '4';

function HourView(props) {
  var hours = props.hours,
      hasHeader = props.hasHeader,
      onHourClick = props.onHourClick,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      hasPrevPage = props.hasPrevPage,
      hasNextPage = props.hasNextPage,
      onHeaderClick = props.onHeaderClick,
      disabled = props.disabled,
      active = props.active,
      currentDate = props.currentDate;

  var headerProps = {
    onNextPageBtnClick: onNextPageBtnClick,
    onPrevPageBtnClick: onPrevPageBtnClick,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
    onHeaderClick: onHeaderClick,
    title: currentDate,
    width: HOUR_CALENDAR_ROW_WIDTH,
    displayWeeks: false
  };
  return _react2.default.createElement(
    _Calendar2.default,
    null,
    hasHeader && _react2.default.createElement(_Header2.default, headerProps),
    _react2.default.createElement(_Body2.default, {
      data: hours,
      width: HOUR_CALENDAR_ROW_WIDTH,
      onCellClick: onHourClick,
      active: active,
      disabled: disabled })
  );
}

HourView.handledProps = ['active', 'currentDate', 'disabled', 'hasHeader', 'hasNextPage', 'hasPrevPage', 'hours', 'onHeaderClick', 'onHourClick', 'onNextPageBtnClick', 'onPrevPageBtnClick'];
HourView.propTypes = {
  /** Array of hours to fill a calendar with. */
  hours: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  /** Wether to display header or not. */
  hasHeader: _propTypes2.default.bool.isRequired,
  /** Called after click on hour. */
  onHourClick: _propTypes2.default.func.isRequired,
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
  /** Array of hour indexes to display as disabled. */
  disabled: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** Hour index to display as active. */
  active: _propTypes2.default.number,
  /** Date that is displayed in calendar header. */
  currentDate: _propTypes2.default.string
};

exports.default = HourView;