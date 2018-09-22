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

var _YearPicker = require('../pickers/YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

var _parse = require('./parse');

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearInput = function (_BaseInput) {
  _inherits(YearInput, _BaseInput);

  function YearInput(props) {
    _classCallCheck(this, YearInput);

    var _this = _possibleConstructorReturn(this, (YearInput.__proto__ || Object.getPrototypeOf(YearInput)).call(this, props));

    _this.handleSelect = function (e, _ref) {
      var value = _ref.value;

      var date = (0, _moment2.default)({ year: value.year });
      var output = '';
      if (date.isValid()) {
        output = date.format(_this.props.dateFormat);
      }
      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: output }));
      if (_this.props.closable) {
        _this.closePopup();
      }
    };

    _this.state = {};
    return _this;
  }

  _createClass(YearInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          disable = _props.disable,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          initialDate = _props.initialDate,
          dateFormat = _props.dateFormat;

      var rest = (0, _lib.getUnhandledProps)(YearInput, this.props);
      return _react2.default.createElement(
        _InputView2.default,
        _extends({
          popupIsClosed: this.state.popupIsClosed,
          onPopupUnmount: this.onPopupClose,
          icon: 'calendar'
        }, rest, {
          value: value }),
        _react2.default.createElement(_YearPicker2.default, {
          onChange: this.handleSelect,
          initializeWith: (0, _parse.getInitializer)({ initialDate: initialDate, dateFormat: dateFormat }),
          value: (0, _parse.parseValue)(value, dateFormat),
          disable: (0, _parse.parseArrayOrValue)(disable, dateFormat),
          maxDate: (0, _parse.parseValue)(maxDate, dateFormat),
          minDate: (0, _parse.parseValue)(minDate, dateFormat) })
      );
    }
  }]);

  return YearInput;
}(_BaseInput3.default);

YearInput.handledProps = ['closable', 'dateFormat', 'disable', 'initialDate', 'maxDate', 'minDate', 'value'];


YearInput.propTypes = {
  /** Currently selected value. */
  value: _propTypes2.default.string,
  /** Moment date formatting string. */
  dateFormat: _propTypes2.default.string,
  /** Date to display initially when no date is selected. */
  initialDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Date or list of dates that are displayed as disabled. */
  disable: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)), _propTypes2.default.instanceOf(Date), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]),
  /** Maximum date that can be selected. */
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Minimum date that can be selected. */
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** If true, popup closes after selecting a date-time. */
  closable: _propTypes2.default.bool
};

YearInput.defaultProps = {
  dateFormat: 'YYYY'
};

exports.default = YearInput;