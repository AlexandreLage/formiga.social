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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YEAR_CALENDAR_ROW_WIDTH = '3';

function YearView(props) {
  var years = props.years,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      onYearClick = props.onYearClick,
      hasNextPage = props.hasNextPage,
      hasPrevPage = props.hasPrevPage,
      onHeaderClick = props.onHeaderClick,
      disabled = props.disabled,
      active = props.active;

  var headerTitle = _lodash2.default.first(years) + ' - ' + _lodash2.default.last(years);
  return _react2.default.createElement(
    _Calendar2.default,
    null,
    _react2.default.createElement(_Header2.default, {
      title: headerTitle,
      onNextPageBtnClick: onNextPageBtnClick,
      onPrevPageBtnClick: onPrevPageBtnClick,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      onHeaderClick: onHeaderClick,
      width: YEAR_CALENDAR_ROW_WIDTH,
      displayWeeks: false }),
    _react2.default.createElement(_Body2.default, {
      width: YEAR_CALENDAR_ROW_WIDTH,
      data: years,
      onCellClick: onYearClick,
      active: active,
      disabled: disabled })
  );
}

YearView.handledProps = ['active', 'disabled', 'hasNextPage', 'hasPrevPage', 'onHeaderClick', 'onNextPageBtnClick', 'onPrevPageBtnClick', 'onYearClick', 'years'];
YearView.propTypes = {
  /** An array of years to fill a calendar with. */
  years: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  /** Called after click on next page button. */
  onNextPageBtnClick: _propTypes2.default.func.isRequired,
  /** Called after click on previous page button. */
  onPrevPageBtnClick: _propTypes2.default.func.isRequired,
  /** Called after click on year. */
  onYearClick: _propTypes2.default.func.isRequired,
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: _propTypes2.default.bool.isRequired,
  /** Whether to display next page button as active or disabled. */
  hasNextPage: _propTypes2.default.bool.isRequired,
  /** Called after click on calendar header. */
  onHeaderClick: _propTypes2.default.func,
  /** An array of numbers that represent indexes of years in `years` array that should be displayed as disabled. */
  disabled: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** Index of a year in `years` array that should be displayed as active. */
  active: _propTypes2.default.number
};

exports.default = YearView;