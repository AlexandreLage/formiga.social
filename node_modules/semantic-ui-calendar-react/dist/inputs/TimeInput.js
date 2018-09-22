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

var _InputView = require('../views/InputView');

var _InputView2 = _interopRequireDefault(_InputView);

var _HourPicker = require('../pickers/timePicker/HourPicker');

var _HourPicker2 = _interopRequireDefault(_HourPicker);

var _MinutePicker = require('../pickers/timePicker/MinutePicker');

var _MinutePicker2 = _interopRequireDefault(_MinutePicker);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

var _parse = require('./parse');

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getNextMode(currentMode) {
  if (currentMode === 'hour') return 'minute';
  return 'hour';
}

var TimeInput = function (_BaseInput) {
  _inherits(TimeInput, _BaseInput);

  /**
   * Component responsibility:
   *  - parse time input string
   *  - switch between modes ['hour', 'minute']
   *  - handle HourPicker/MinutePicker change (format { hour: number, minute: number } into output time string)
   */

  function TimeInput(props) {
    _classCallCheck(this, TimeInput);

    var _this = _possibleConstructorReturn(this, (TimeInput.__proto__ || Object.getPrototypeOf(TimeInput)).call(this, props));

    _this.handleSelect = function (e, _ref) {
      var value = _ref.value;

      (0, _lib.tick)(_this.handleSelectUndelayed, e, { value: value });
    };

    _this.handleSelectUndelayed = function (e, _ref2) {
      var value = _ref2.value;
      var hour = value.hour,
          minute = value.minute;
      var timeFormat = _this.props.timeFormat;

      var outputTimeString = '';
      if (_this.state.mode === 'hour' && !_lodash2.default.isNil(hour)) {
        outputTimeString = (0, _moment2.default)({ hour: hour }).format(_parse.TIME_FORMAT[timeFormat]);
      } else if (!_lodash2.default.isNil(hour) && !_lodash2.default.isNil(minute)) {
        outputTimeString = (0, _moment2.default)({ hour: hour, minute: minute }).format(_parse.TIME_FORMAT[timeFormat]);
      }
      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: outputTimeString }));
      if (_this.props.closable && _this.state.mode === 'minute') {
        _this.closePopup();
      }
      _this.setState(function (prevState) {
        return { mode: getNextMode(prevState.mode) };
      });
    };

    _this.state = {
      mode: 'hour'
    };
    return _this;
  }

  _createClass(TimeInput, [{
    key: 'getPicker',
    value: function getPicker() {
      var _props = this.props,
          value = _props.value,
          timeFormat = _props.timeFormat;

      var currentValue = (0, _parse.parseValue)(value, _parse.TIME_FORMAT[timeFormat]);
      var pickerProps = {
        hasHeader: false,
        initializeWith: (0, _parse.getInitializer)({ initialDate: currentValue, dateFormat: _parse.TIME_FORMAT[timeFormat] }),
        value: currentValue,
        onChange: this.handleSelect,
        timeFormat: timeFormat
        // key: value, // seems like it works without reinstantiating picker every time value changes
      };
      if (this.state.mode === 'hour') {
        return _react2.default.createElement(_HourPicker2.default, pickerProps);
      }
      return _react2.default.createElement(_MinutePicker2.default, pickerProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.value;

      var rest = (0, _lib.getUnhandledProps)(TimeInput, this.props);
      return _react2.default.createElement(
        _InputView2.default,
        _extends({
          popupIsClosed: this.state.popupIsClosed,
          onPopupUnmount: this.onPopupClose,
          icon: 'time'
        }, rest, {
          value: value }),
        this.getPicker()
      );
    }
  }]);

  return TimeInput;
}(_BaseInput3.default);

TimeInput.handledProps = ['closable', 'timeFormat', 'value'];


TimeInput.propTypes = {
  /** Currently selected value. */
  value: _propTypes2.default.string,
  /** One of ["24", "AMPM", "ampm"] */
  timeFormat: _propTypes2.default.oneOf(['24', 'AMPM', 'ampm']),
  /** If true, popup closes after selecting a date-time. */
  closable: _propTypes2.default.bool
};

TimeInput.defaultProps = {
  timeFormat: '24'
};

exports.default = TimeInput;