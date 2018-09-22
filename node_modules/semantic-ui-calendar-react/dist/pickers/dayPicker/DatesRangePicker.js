'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _DatesRangeView = require('../../views/DatesRangeView');

var _DatesRangeView2 = _interopRequireDefault(_DatesRangeView);

var _DayPicker = require('./DayPicker');

var _lib = require('../../lib');

var _sharedFunctions = require('./sharedFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Return position of a given date on the page.
 * 
 * Page consists of some dates from previous month, dates from current month
 * and some dates from next month.
 * Return undefined if date that is under test is out of page.
 * 
 * @param {Moment} prevMonth 
 * @param {Moment} currentMonth 
 * @param {Moment} nextMonth 
 * @param {Moment} date Date to test
 * @param {number[]} fromPrevMonthDates 
 * @param {number[]} fromCurrentMonthDates 
 * @param {number[]} fromNextMonthDates 
 */
function getDatePosition(prevMonth, currentMonth, nextMonth, date, fromPrevMonthDates, fromCurrentMonthDates, fromNextMonthDates) {
  if (date.isSame(prevMonth, 'month')) {
    var position = fromPrevMonthDates.indexOf(date.date());
    if (position >= 0) {
      return position;
    }
  }
  if (date.isSame(currentMonth, 'month')) {
    return fromCurrentMonthDates.indexOf(date.date()) + fromPrevMonthDates.length;
  }
  if (date.isSame(nextMonth, 'month')) {
    var _position = fromNextMonthDates.indexOf(date.date());
    if (_position >= 0) {
      return _position + fromPrevMonthDates.length + fromCurrentMonthDates.length;
    }
  }
}

function getDatesFromPrevMonth(date, allDays, currentMonthStartPosition) {
  if (currentMonthStartPosition === 0) {
    return [];
  }
  return allDays.slice(0, currentMonthStartPosition).map(function (date) {
    return parseInt(date);
  });
}

function getDatesFromNextMonth(date, allDays, nextMonthStartPosition) {
  if (nextMonthStartPosition === allDays.length) {
    return [];
  }
  return allDays.slice(nextMonthStartPosition, allDays.length).map(function (date) {
    return parseInt(date);
  });
}

/** Build moment based on current page and date position on that page. */
function buildMoment(date /*Moment*/, firstOnPage /*number*/, dateToBuildPosition /*number*/) {
  var result = void 0;
  if (firstOnPage === 1 /* page starts from first day in month */) {
      result = (0, _moment2.default)({ year: date.year(), month: date.month(), date: firstOnPage });
    } else {
    /* page starts from day in previous month */
    result = (0, _moment2.default)({ year: date.year(), month: date.month() - 1, date: firstOnPage });
  }
  result.add(dateToBuildPosition, 'day');
  return result;
}

var DatesRangePicker = function (_React$Component) {
  _inherits(DatesRangePicker, _React$Component);

  function DatesRangePicker(props) {
    _classCallCheck(this, DatesRangePicker);

    var _this = _possibleConstructorReturn(this, (DatesRangePicker.__proto__ || Object.getPrototypeOf(DatesRangePicker)).call(this, props));

    _this.handleChange = function (e, _ref) {
      var itemPosition = _ref.itemPosition;

      // call `onChange` with value: { start: moment, end: moment }
      var _this$props = _this.props,
          start = _this$props.start,
          end = _this$props.end;

      var firstOnPage = parseInt(_this.buildDays()[0]);
      if (_lodash2.default.isNil(start) && _lodash2.default.isNil(end)) {
        var range = {
          start: buildMoment(_this.state.date, firstOnPage, itemPosition)
        };
        _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: range }));
      } else if (!_lodash2.default.isNil(start) && _lodash2.default.isNil(end)) {
        var selectedDate = buildMoment(_this.state.date, firstOnPage, itemPosition);
        if (selectedDate.isAfter(start, 'date')) {
          var _range = {
            start: start,
            end: selectedDate
          };
          _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: _range }));
        } else {
          _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: {} }));
        }
      } else {
        _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: {} }));
      }
    };

    _this.switchToNextPage = function () {
      _this.setState(function (_ref2) {
        var date = _ref2.date;

        var nextDate = date.clone();
        nextDate.add(1, 'month');
        return { date: nextDate };
      });
    };

    _this.switchToPrevPage = function () {
      _this.setState(function (_ref3) {
        var date = _ref3.date;

        var prevDate = date.clone();
        prevDate.subtract(1, 'month');
        return { date: prevDate };
      });
    };

    _this.state = {
      /* moment instance */
      date: props.initializeWith.clone()
    };
    return _this;
  }

  _createClass(DatesRangePicker, [{
    key: 'buildDays',
    value: function buildDays() {
      /*
        Return array of dates (strings) like ['31', '1', ...]
        that used to populate calendar's page.
      */
      return (0, _sharedFunctions.buildDays)(this.state.date, _DayPicker.DAYS_ON_PAGE);
    }

    // TODO: too complicated method

  }, {
    key: 'getActiveDaysPositions',
    value: function getActiveDaysPositions() {
      /*
        Return starting and ending positions of dates range that should be displayed as active
        { start: number, end: number }
        (position in array returned by `this.buildDays`).
      */
      var date = this.state.date;
      var _props = this.props,
          start = _props.start,
          end = _props.end;

      var allDays = this.buildDays();
      var fromCurrentMonthDayPositions = (0, _sharedFunctions.getDefaultEnabledDayPositions)(allDays, date);

      var fromPrevMonthDates = getDatesFromPrevMonth(date, allDays, fromCurrentMonthDayPositions[0]);
      var fromNextMonthDates = getDatesFromNextMonth(date, allDays, _lodash2.default.last(fromCurrentMonthDayPositions) + 1);
      var fromCurrentMonthDates = _lodash2.default.range(1, this.state.date.daysInMonth() + 1);

      var prevMonth = date.clone();
      prevMonth.subtract(1, 'month');
      var nextMonth = date.clone();
      nextMonth.add(1, 'month');

      if (start && end) {
        var startPosition = getDatePosition(prevMonth, this.state.date, nextMonth, start, fromPrevMonthDates, fromCurrentMonthDates, fromNextMonthDates);

        var endPosition = getDatePosition(prevMonth, this.state.date, nextMonth, end, fromPrevMonthDates, fromCurrentMonthDates, fromNextMonthDates);
        if (startPosition && endPosition) {
          return { start: startPosition, end: endPosition };
        }
        if (startPosition) {
          return { start: startPosition, end: _DayPicker.DAYS_ON_PAGE - 1 };
        }
        if (endPosition) {
          return { start: 0, end: endPosition };
        }
        if (this.state.date.isBetween(start, end)) {
          return { start: 0, end: _DayPicker.DAYS_ON_PAGE - 1 };
        }
      }
      if (start) {
        var _startPosition = getDatePosition(prevMonth, this.state.date, nextMonth, start, fromPrevMonthDates, fromCurrentMonthDates, fromNextMonthDates);
        return { start: _startPosition, end: undefined };
      }
      return { start: undefined, end: undefined };
    }
  }, {
    key: 'getDisabledDaysPositions',
    value: function getDisabledDaysPositions() {
      /*
        Return position numbers of dates that should be displayed as disabled
        (position in array returned by `this.buildDays`).
      */
      var _props2 = this.props,
          maxDate = _props2.maxDate,
          minDate = _props2.minDate;

      return (0, _sharedFunctions.getDisabledDays)(undefined, maxDate, minDate, this.state.date, _DayPicker.DAYS_ON_PAGE);
    }
  }, {
    key: 'isNextPageAvailable',
    value: function isNextPageAvailable() {
      return (0, _sharedFunctions.isNextPageAvailable)(this.state.date, this.props.maxDate);
    }
  }, {
    key: 'isPrevPageAvailable',
    value: function isPrevPageAvailable() {
      return (0, _sharedFunctions.isPrevPageAvailable)(this.state.date, this.props.minDate);
    }
  }, {
    key: 'getCurrentDate',
    value: function getCurrentDate() {
      /* Return currently selected year and month(string) to display in calendar header. */
      return this.state.date.format('MMMM YYYY');
    }
  }, {
    key: 'getSelectedRange',
    value: function getSelectedRange() {
      /* Return currently selected dates range(string) to display in calendar header. */
      var _props3 = this.props,
          start = _props3.start,
          end = _props3.end,
          dateFormat = _props3.dateFormat;

      return (start ? start.format(dateFormat) : '- - -') + ' - ' + (end ? end.format(dateFormat) : '- - -');
    }
  }, {
    key: 'render',
    value: function render() {
      var rest = (0, _lib.getUnhandledProps)(DatesRangePicker, this.props);
      return _react2.default.createElement(_DatesRangeView2.default, _extends({}, rest, {
        days: this.buildDays(),
        onNextPageBtnClick: this.switchToNextPage,
        onPrevPageBtnClick: this.switchToPrevPage,
        onDayClick: this.handleChange,
        hasPrevPage: this.isPrevPageAvailable(),
        hasNextPage: this.isNextPageAvailable(),
        currentDate: this.getCurrentDate(),
        selectedRange: this.getSelectedRange(),
        active: this.getActiveDaysPositions(),
        disabled: this.getDisabledDaysPositions() }));
    }
  }]);

  return DatesRangePicker;
}(_react2.default.Component);

DatesRangePicker.handledProps = ['dateFormat', 'end', 'initializeWith', 'maxDate', 'minDate', 'onChange', 'start'];


DatesRangePicker.propTypes = {
  /** Called after day is selected. */
  onChange: _propTypes2.default.func.isRequired,
  /** A value for initializing day picker's state. */
  initializeWith: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Moment date formatting string. */
  dateFormat: _propTypes2.default.string.isRequired,
  /** Start of currently selected dates range. */
  start: _propTypes2.default.instanceOf(_moment2.default),
  /** End of currently selected dates range. */
  end: _propTypes2.default.instanceOf(_moment2.default),
  /** Minimal date that could be selected. */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Maximal date that could be selected. */
  maxDate: _propTypes2.default.instanceOf(_moment2.default)
};

exports.default = DatesRangePicker;