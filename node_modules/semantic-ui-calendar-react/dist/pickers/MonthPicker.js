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

var _MonthView = require('../views/MonthView');

var _MonthView2 = _interopRequireDefault(_MonthView);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MONTHS_IN_YEAR = 12;

var MonthPicker = function (_React$Component) {
  _inherits(MonthPicker, _React$Component);

  /*
    Note:
      use it like this <MonthPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  function MonthPicker(props) {
    _classCallCheck(this, MonthPicker);

    var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props));

    _this.handleChange = function (e, _ref) {
      var value = _ref.value;

      var year = parseInt(_this.getCurrentYear());
      var month = _this.buildMonths().indexOf(value);
      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: { year: year, month: month } }));
    };

    _this.switchToNextPage = function () {
      _this.setState(function (_ref2) {
        var date = _ref2.date;

        var nextDate = date.clone();
        nextDate.add(1, 'year');
        return { date: nextDate };
      });
    };

    _this.switchToPrevPage = function () {
      _this.setState(function (_ref3) {
        var date = _ref3.date;

        var prevDate = date.clone();
        prevDate.subtract(1, 'year');
        return { date: prevDate };
      });
    };

    _this.state = {
      /* moment instance */
      date: props.initializeWith.clone()
    };
    return _this;
  }

  _createClass(MonthPicker, [{
    key: 'buildMonths',
    value: function buildMonths() {
      /*
        Return array of months (strings) like ['Aug', 'Sep', ...]
        that used to populate calendar's page.
      */
      return _moment2.default.monthsShort();
    }
  }, {
    key: 'getActiveMonthPosition',
    value: function getActiveMonthPosition() {
      /*
        Return position of a month that should be displayed as active
        (position in array returned by `this.buildMonths`).
      */
      if (!_lodash2.default.isNil(this.props.value)) {
        if (this.props.value.year() === this.state.date.year()) {
          return this.props.value.month();
        }
      }
    }
  }, {
    key: 'getDisabledMonthsPositions',
    value: function getDisabledMonthsPositions() {
      var _this2 = this;

      /*
        Return position numbers of months that should be displayed as disabled
        (position in array returned by `this.buildMonths`).
      */
      var disabled = [];
      if (_lodash2.default.isArray(this.props.enable)) {
        var enabledMonthPositions = this.props.enable.filter(function (monthMoment) {
          return monthMoment.isSame(_this2.state.date, 'year');
        }).map(function (monthMoment) {
          return monthMoment.month();
        });
        disabled = disabled.concat(_lodash2.default.range(0, MONTHS_IN_YEAR).filter(function (monthPosition) {
          return !_lodash2.default.includes(enabledMonthPositions, monthPosition);
        }));
      }
      if (_lodash2.default.isArray(this.props.disable)) {
        disabled = disabled.concat(this.props.disable.filter(function (monthMoment) {
          return monthMoment.year() === _this2.state.date.year();
        }).map(function (monthMoment) {
          return monthMoment.month();
        }));
      }
      if (!_lodash2.default.isNil(this.props.maxDate)) {
        if (this.props.maxDate.year() === this.state.date.year()) {
          disabled = disabled.concat(_lodash2.default.range(this.props.maxDate.month() + 1, MONTHS_IN_YEAR));
        }
        if (this.props.maxDate.year() < this.state.date.year()) {
          disabled = _lodash2.default.range(0, MONTHS_IN_YEAR);
        }
      }
      if (!_lodash2.default.isNil(this.props.minDate)) {
        if (this.props.minDate.year() === this.state.date.year()) {
          disabled = disabled.concat(_lodash2.default.range(0, this.props.minDate.month()));
        }
        if (this.props.minDate.year() > this.state.date.year()) {
          disabled = _lodash2.default.range(0, MONTHS_IN_YEAR);
        }
      }
      if (disabled.length > 0) {
        return _lodash2.default.uniq(disabled);
      }
    }
  }, {
    key: 'isNextPageAvailable',
    value: function isNextPageAvailable() {
      var _this3 = this;

      var _props = this.props,
          maxDate = _props.maxDate,
          enable = _props.enable;

      if (_lodash2.default.isArray(enable)) {
        return _lodash2.default.some(enable, function (enabledMonth) {
          return enabledMonth.isAfter(_this3.state.date, 'year');
        });
      }
      if (_lodash2.default.isNil(maxDate)) return true;
      if (this.state.date.year() >= maxDate.year()) return false;
      return true;
    }
  }, {
    key: 'isPrevPageAvailable',
    value: function isPrevPageAvailable() {
      var _this4 = this;

      var _props2 = this.props,
          minDate = _props2.minDate,
          enable = _props2.enable;

      if (_lodash2.default.isArray(enable)) {
        return _lodash2.default.some(enable, function (enabledMonth) {
          return enabledMonth.isBefore(_this4.state.date, 'year');
        });
      }
      if (_lodash2.default.isNil(minDate)) return true;
      if (this.state.date.year() <= minDate.year()) return false;
      return true;
    }
  }, {
    key: 'getCurrentYear',
    value: function getCurrentYear() {
      /* Return current year(string) to display in calendar header. */
      return this.state.date.year().toString();
    }
  }, {
    key: 'render',
    value: function render() {
      var rest = (0, _lib.getUnhandledProps)(MonthPicker, this.props);
      return _react2.default.createElement(_MonthView2.default, _extends({}, rest, {
        months: this.buildMonths(),
        onMonthClick: this.handleChange,
        onNextPageBtnClick: this.switchToNextPage,
        onPrevPageBtnClick: this.switchToPrevPage,
        hasPrevPage: this.isPrevPageAvailable(),
        hasNextPage: this.isNextPageAvailable(),
        disabled: this.getDisabledMonthsPositions(),
        active: this.getActiveMonthPosition(),
        currentYear: this.getCurrentYear() }));
    }
  }]);

  return MonthPicker;
}(_react2.default.Component);

MonthPicker.handledProps = ['disable', 'enable', 'initializeWith', 'maxDate', 'minDate', 'onChange', 'value'];


MonthPicker.propTypes = {
  /** Called after month is selected. */
  onChange: _propTypes2.default.func.isRequired,
  /** A value for initializing month picker's state. */
  initializeWith: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Currently selected month. */
  value: _propTypes2.default.instanceOf(_moment2.default),
  /** Array of disabled months. */
  disable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Array of enabled months. */
  enable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Minimal month that could be selected. */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Maximal month that could be selected. */
  maxDate: _propTypes2.default.instanceOf(_moment2.default)
};

exports.default = MonthPicker;