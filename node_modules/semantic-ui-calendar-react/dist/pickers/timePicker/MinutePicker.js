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

var _MinuteView = require('../../views/MinuteView');

var _MinuteView2 = _interopRequireDefault(_MinuteView);

var _lib = require('../../lib');

var _sharedFunctions = require('./sharedFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MINUTES_STEP = 5;

var MinutePicker = function (_React$Component) {
  _inherits(MinutePicker, _React$Component);

  function MinutePicker(props) {
    _classCallCheck(this, MinutePicker);

    var _this = _possibleConstructorReturn(this, (MinutePicker.__proto__ || Object.getPrototypeOf(MinutePicker)).call(this, props));

    _this.handleChange = function (e, _ref) {
      var value = _ref.value;

      var data = {
        year: _this.state.date.year(),
        month: _this.state.date.month(),
        date: _this.state.date.date(),
        hour: _this.state.date.hour(),
        minute: _this.buildMinutes().indexOf(value) * MINUTES_STEP
      };
      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: data }));
    };

    _this.switchToNextPage = function () {
      _this.setState(function (_ref2) {
        var date = _ref2.date;

        var nextDate = date.clone();
        nextDate.add(1, 'day');
        return { date: nextDate };
      });
    };

    _this.switchToPrevPage = function () {
      _this.setState(function (_ref3) {
        var date = _ref3.date;

        var prevDate = date.clone();
        prevDate.subtract(1, 'day');
        return { date: prevDate };
      });
    };

    _this.state = {
      /* moment instance */
      date: props.initializeWith.clone()
    };
    return _this;
  }

  _createClass(MinutePicker, [{
    key: 'buildMinutes',
    value: function buildMinutes() {
      var _this2 = this;

      /*
        Return array of minutes (strings) like ['16:15', '16:20', ...]
        that used to populate calendar's page.
      */
      var hour = this.state.date.hour() < 10 ? '0' + this.state.date.hour().toString() : this.state.date.hour().toString();
      return _lodash2.default.range(0, 60, MINUTES_STEP).map(function (minute) {
        return '' + (minute < 10 ? '0' : '') + minute;
      }).map(function (minute) {
        return (0, _sharedFunctions.buildTimeStringWithSuffix)(hour, minute, _this2.props.timeFormat);
      });
    }
  }, {
    key: 'getActiveMinutePosition',
    value: function getActiveMinutePosition() {
      /*
        Return position of a minute that should be displayed as active
        (position in array returned by `this.buildMinutes`).
      */
      var value = this.props.value;

      if (value && value.isSame(this.state.date, 'date')) {
        return Math.floor(this.props.value.minutes() / MINUTES_STEP);
      }
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
      /* Return currently selected month, date and year(string) to display in calendar header. */
      return (0, _sharedFunctions.getCurrentDate)(this.state.date);
    }
  }, {
    key: 'render',
    value: function render() {
      var rest = (0, _lib.getUnhandledProps)(MinutePicker, this.props);
      return _react2.default.createElement(_MinuteView2.default, _extends({}, rest, {
        minutes: this.buildMinutes(),
        onNextPageBtnClick: this.switchToNextPage,
        onPrevPageBtnClick: this.switchToPrevPage,
        onMinuteClick: this.handleChange,
        hasNextPage: this.isNextPageAvailable(),
        hasPrevPage: this.isPrevPageAvailable(),
        currentDate: this.getCurrentDate(),
        active: this.getActiveMinutePosition() }));
    }
  }]);

  return MinutePicker;
}(_react2.default.Component);

MinutePicker.handledProps = ['disable', 'initializeWith', 'maxDate', 'minDate', 'onChange', 'timeFormat', 'value'];


MinutePicker.propTypes = {
  /** Called after minute is selected. */
  onChange: _propTypes2.default.func.isRequired,
  /** A value for initializing minute picker's state. */
  initializeWith: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Currently selected minute. */
  value: _propTypes2.default.instanceOf(_moment2.default),
  /** Array of disabled dates. */
  disable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Minimal date that could be selected. */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Maximal date that could be selected. */
  maxDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Time format. */
  timeFormat: _propTypes2.default.oneOf(['ampm', 'AMPM', '24'])
};

MinutePicker.defaultProps = {
  timeFormat: '24'
};

exports.default = MinutePicker;