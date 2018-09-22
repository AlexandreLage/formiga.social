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

var _HourView = require('../../views/HourView');

var _HourView2 = _interopRequireDefault(_HourView);

var _lib = require('../../lib');

var _sharedFunctions = require('./sharedFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HourPicker = function (_React$Component) {
  _inherits(HourPicker, _React$Component);

  function HourPicker(props) {
    _classCallCheck(this, HourPicker);

    var _this = _possibleConstructorReturn(this, (HourPicker.__proto__ || Object.getPrototypeOf(HourPicker)).call(this, props));

    _this.handleChange = function (e, _ref) {
      var value = _ref.value;

      var data = {
        year: _this.state.date.year(),
        month: _this.state.date.month(),
        date: _this.state.date.date(),
        hour: _this.buildHours().indexOf(value)
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

  _createClass(HourPicker, [{
    key: 'buildHours',
    value: function buildHours() {
      var _this2 = this;

      /*
        Return array of hours (strings) like ['16:00', '17:00', ...]
        that used to populate calendar's page.
      */
      return _lodash2.default.range(0, 24).map(function (h) {
        return '' + (h < 10 ? '0' : '') + h;
      }).map(function (hour) {
        return (0, _sharedFunctions.buildTimeStringWithSuffix)(hour, '00', _this2.props.timeFormat);
      });
    }
  }, {
    key: 'getActiveHourPosition',
    value: function getActiveHourPosition() {
      /*
        Return position of an hour that should be displayed as active
        (position in array returned by `this.buildHours`).
      */
      var value = this.props.value;

      if (value && value.isSame(this.state.date, 'date')) {
        return this.props.value.hour();
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
    key: 'getDisabledHoursPositions',
    value: function getDisabledHoursPositions() {
      var _this3 = this;

      /*
        Return position numbers of hours that should be displayed as disabled
        (position in array returned by `this.buildHours`).
      */
      var _props = this.props,
          disable = _props.disable,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      var disabledByDisable = [];
      var disabledByMaxDate = [];
      var disabledByMinDate = [];

      if (_lodash2.default.isArray(disable)) {
        disabledByDisable = _lodash2.default.concat(disabledByDisable, disable.filter(function (date) {
          return date.isSame(_this3.state.date, 'day');
        }).map(function (date) {
          return date.hour();
        }));
      }
      if (minDate) {
        if (minDate.isSame(this.state.date, 'day')) {
          disabledByMinDate = _lodash2.default.concat(disabledByMinDate, _lodash2.default.range(0, minDate.hour()));
        }
      }
      if (maxDate) {
        if (maxDate.isSame(this.state.date, 'day')) {
          disabledByMaxDate = _lodash2.default.concat(disabledByMaxDate, _lodash2.default.range(maxDate.hour() + 1, 24));
        }
      }
      var result = _lodash2.default.sortBy(_lodash2.default.uniq(_lodash2.default.concat(disabledByDisable, disabledByMaxDate, disabledByMinDate)));
      if (result.length > 0) {
        return result;
      }
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
      var rest = (0, _lib.getUnhandledProps)(HourPicker, this.props);
      return _react2.default.createElement(_HourView2.default, _extends({}, rest, {
        hours: this.buildHours(),
        onNextPageBtnClick: this.switchToNextPage,
        onPrevPageBtnClick: this.switchToPrevPage,
        hasPrevPage: this.isPrevPageAvailable(),
        hasNextPage: this.isNextPageAvailable(),
        onHourClick: this.handleChange,
        disabled: this.getDisabledHoursPositions(),
        active: this.getActiveHourPosition(),
        currentDate: this.getCurrentDate() }));
    }
  }]);

  return HourPicker;
}(_react2.default.Component);

HourPicker.handledProps = ['disable', 'initializeWith', 'maxDate', 'minDate', 'onChange', 'timeFormat', 'value'];


HourPicker.propTypes = {
  /** Called after hour is selected. */
  onChange: _propTypes2.default.func.isRequired,
  /** A value for initializing hour picker's state. */
  initializeWith: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Currently selected hour. */
  value: _propTypes2.default.instanceOf(_moment2.default),
  /** Array of disabled hours. */
  disable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Minimal date that could be selected. */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Maximal date that could be selected. */
  maxDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Time format. */
  timeFormat: _propTypes2.default.oneOf(['ampm', 'AMPM', '24'])
};

HourPicker.defaultProps = {
  timeFormat: '24'
};

exports.default = HourPicker;