'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DAYS_ON_PAGE = undefined;

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

var _DayView = require('../../views/DayView');

var _DayView2 = _interopRequireDefault(_DayView);

var _lib = require('../../lib');

var _sharedFunctions = require('./sharedFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DAYS_ON_PAGE = exports.DAYS_ON_PAGE = _DayView.WEEKS_TO_DISPLAY * 7;

var DayPicker = function (_React$Component) {
  _inherits(DayPicker, _React$Component);

  function DayPicker(props) {
    _classCallCheck(this, DayPicker);

    var _this = _possibleConstructorReturn(this, (DayPicker.__proto__ || Object.getPrototypeOf(DayPicker)).call(this, props));

    _this.handleChange = function (e, _ref) {
      var value = _ref.value;

      // `value` is selected date(string) like '31' or '1'
      var result = {
        year: _this.state.date.year(),
        month: _this.state.date.month(),
        date: parseInt(value)
      };

      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: result }));
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

  _createClass(DayPicker, [{
    key: 'buildDays',
    value: function buildDays() {
      /*
        Return array of dates (strings) like ['31', '1', ...]
        that used to populate calendar's page.
      */
      return (0, _sharedFunctions.buildDays)(this.state.date, DAYS_ON_PAGE);
    }
  }, {
    key: 'getActiveDayPosition',
    value: function getActiveDayPosition() {
      /*
        Return position of a date that should be displayed as active
        (position in array returned by `this.buildDays`).
      */
      if (this.props.value && this.props.value.isSame(this.state.date, 'month')) {
        var disabledPositions = this.getDisabledDaysPositions();
        var active = this.buildDays().map(function (day, i) {
          return _lodash2.default.includes(disabledPositions, i) ? undefined : day;
        }).indexOf(this.props.value.date().toString());
        if (active >= 0) {
          return active;
        }
      }
    }
  }, {
    key: 'getDisabledDaysPositions',
    value: function getDisabledDaysPositions() {
      /*
        Return position numbers of dates that should be displayed as disabled
        (position in array returned by `this.buildDays`).
      */
      var _props = this.props,
          disable = _props.disable,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          enable = _props.enable;

      return (0, _sharedFunctions.getDisabledDays)(disable, maxDate, minDate, this.state.date, DAYS_ON_PAGE, enable);
    }
  }, {
    key: 'isNextPageAvailable',
    value: function isNextPageAvailable() {
      var _this2 = this;

      var _props2 = this.props,
          maxDate = _props2.maxDate,
          enable = _props2.enable;

      if (_lodash2.default.isArray(enable)) {
        return _lodash2.default.some(enable, function (enabledDate) {
          return enabledDate.isAfter(_this2.state.date, 'month');
        });
      }
      return (0, _sharedFunctions.isNextPageAvailable)(this.state.date, maxDate);
    }
  }, {
    key: 'isPrevPageAvailable',
    value: function isPrevPageAvailable() {
      var _this3 = this;

      var _props3 = this.props,
          minDate = _props3.minDate,
          enable = _props3.enable;

      if (_lodash2.default.isArray(enable)) {
        return _lodash2.default.some(enable, function (enabledDate) {
          return enabledDate.isBefore(_this3.state.date, 'month');
        });
      }
      return (0, _sharedFunctions.isPrevPageAvailable)(this.state.date, minDate);
    }
  }, {
    key: 'getCurrentDate',
    value: function getCurrentDate() {
      /* Return currently selected year and month(string) to display in calendar header. */
      return this.state.date.format('MMMM YYYY');
    }
  }, {
    key: 'render',
    value: function render() {
      var rest = (0, _lib.getUnhandledProps)(DayPicker, this.props);
      return _react2.default.createElement(_DayView2.default, _extends({}, rest, {
        days: this.buildDays(),
        hasNextPage: this.isNextPageAvailable(),
        hasPrevPage: this.isPrevPageAvailable(),
        onNextPageBtnClick: this.switchToNextPage,
        onPrevPageBtnClick: this.switchToPrevPage,
        onDayClick: this.handleChange,
        currentDate: this.getCurrentDate(),
        disabled: this.getDisabledDaysPositions(),
        active: this.getActiveDayPosition() }));
    }
  }]);

  return DayPicker;
}(_react2.default.Component);

DayPicker.handledProps = ['disable', 'enable', 'initializeWith', 'maxDate', 'minDate', 'onChange', 'value'];


DayPicker.propTypes = {
  /** Called after day is selected. */
  onChange: _propTypes2.default.func.isRequired,
  /** A value for initializing day picker's state. */
  initializeWith: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Currently selected day. */
  value: _propTypes2.default.instanceOf(_moment2.default),
  /** Array of disabled days. */
  disable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Array of enabled days. */
  enable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Minimal date that could be selected. */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Maximal date that could be selected. */
  maxDate: _propTypes2.default.instanceOf(_moment2.default)
};

exports.default = DayPicker;