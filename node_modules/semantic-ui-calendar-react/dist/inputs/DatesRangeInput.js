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

var _parse = require('./parse');

var _lib = require('../lib');

var _DatesRangePicker = require('../pickers/dayPicker/DatesRangePicker');

var _DatesRangePicker2 = _interopRequireDefault(_DatesRangePicker);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DATES_SEPARATOR = ' - ';

function cleanDate(inputString, dateFormat) {
  var formattedDateLength = (0, _moment2.default)().format(dateFormat).length;
  return inputString.trim().slice(0, formattedDateLength);
}

/**
 * Extract start and end dates from input string.
 * Return { start: Moment|undefined, end: Moment|undefined }
 * @param {string} inputString Row input string from user
 * @param {string} dateFormat Moment formatting string
 */
function parseDatesRange(inputString, dateFormat) {
  // dates range is "startDate - endDate"
  var dates = inputString.split(DATES_SEPARATOR).map(function (date) {
    return cleanDate(date, dateFormat);
  });
  var result = {};
  var start = void 0;
  var end = void 0;

  start = (0, _moment2.default)(dates[0], dateFormat);
  if (dates.length === 2) {
    end = (0, _moment2.default)(dates[1], dateFormat);
  }
  if (start && start.isValid()) {
    result.start = start;
  }
  if (end && end.isValid()) {
    result.end = end;
  }
  return result;
}

var DatesRangeInput = function (_BaseInput) {
  _inherits(DatesRangeInput, _BaseInput);

  /**
   * Component responsibility:
   *  - parse input value (start: Moment, end: Moment)
   *  - handle DayPicker change (format {start: Moment, end: Moment} into
   *    string 'start - end')
   */

  function DatesRangeInput(props) {
    _classCallCheck(this, DatesRangeInput);

    var _this = _possibleConstructorReturn(this, (DatesRangeInput.__proto__ || Object.getPrototypeOf(DatesRangeInput)).call(this, props));

    _this.handleSelect = function (e, _ref) {
      var value = _ref.value;
      var dateFormat = _this.props.dateFormat;
      var start = value.start,
          end = value.end;

      var outputString = '';
      if (start && end) {
        outputString = '' + start.format(dateFormat) + DATES_SEPARATOR + end.format(dateFormat);
      } else if (start) {
        outputString = '' + start.format(dateFormat) + DATES_SEPARATOR;
      }
      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: outputString }));
      if (_this.props.closable && start && end) {
        _this.closePopup();
      }
    };

    _this.state = {};
    return _this;
  }

  _createClass(DatesRangeInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          initialDate = _props.initialDate,
          dateFormat = _props.dateFormat,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      var rest = (0, _lib.getUnhandledProps)(DatesRangeInput, this.props);

      var _parseDatesRange = parseDatesRange(value, dateFormat),
          start = _parseDatesRange.start,
          end = _parseDatesRange.end;

      return _react2.default.createElement(
        _InputView2.default,
        _extends({
          popupIsClosed: this.state.popupIsClosed,
          onPopupUnmount: this.onPopupClose,
          icon: 'calendar'
        }, rest, {
          value: value }),
        _react2.default.createElement(_DatesRangePicker2.default, {
          onChange: this.handleSelect,
          dateFormat: dateFormat,
          initializeWith: (0, _parse.getInitializer)({ initialDate: initialDate, dateFormat: dateFormat }),
          start: start,
          end: end,
          minDate: (0, _parse.parseValue)(minDate, dateFormat),
          maxDate: (0, _parse.parseValue)(maxDate, dateFormat) })
      );
    }
  }]);

  return DatesRangeInput;
}(_BaseInput3.default);

DatesRangeInput.handledProps = ['closable', 'dateFormat', 'initialDate', 'maxDate', 'minDate', 'value'];


DatesRangeInput.propTypes = {
  /** Currently selected value. */
  value: _propTypes2.default.string,
  /** Moment date formatting string. */
  dateFormat: _propTypes2.default.string,
  /** Date to display initially when no date is selected. */
  initialDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Maximum date that can be selected. */
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Minimum date that can be selected. */
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** If true, popup closes after selecting a date-time. */
  closable: _propTypes2.default.bool
};

DatesRangeInput.defaultProps = {
  dateFormat: 'DD-MM-YYYY'
};

exports.default = DatesRangeInput;