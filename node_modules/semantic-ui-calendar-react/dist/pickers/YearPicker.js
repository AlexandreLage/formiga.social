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

var _YearView = require('../views/YearView');

var _YearView2 = _interopRequireDefault(_YearView);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YEARS_ON_PAGE = 3 * 4;

var YearPicker = function (_React$Component) {
  _inherits(YearPicker, _React$Component);

  /*
    Note:
      use it like this <YearPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  function YearPicker(props) {
    _classCallCheck(this, YearPicker);

    var _this = _possibleConstructorReturn(this, (YearPicker.__proto__ || Object.getPrototypeOf(YearPicker)).call(this, props));

    _this.handleChange = function (e, _ref) {
      var value = _ref.value;

      var year = parseInt(value);
      _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: { year: year } }));
    };

    _this.switchToNextPage = function () {
      _this.setState(function (_ref2) {
        var date = _ref2.date;

        var nextDate = date.clone();
        nextDate.add(YEARS_ON_PAGE, 'year');
        return { date: nextDate };
      });
    };

    _this.switchToPrevPage = function () {
      _this.setState(function (_ref3) {
        var date = _ref3.date;

        var prevDate = date.clone();
        prevDate.subtract(YEARS_ON_PAGE, 'year');
        return { date: prevDate };
      });
    };

    _this.state = {
      /* moment instance */
      date: props.initializeWith.clone()
    };
    return _this;
  }

  _createClass(YearPicker, [{
    key: 'buildYears',
    value: function buildYears() {
      /*
        Return array of years (strings) like ['2012', '2013', ...]
        that used to populate calendar's page.
      */
      var years = [];
      var first = this.state.date.year();
      for (var i = 0; i < YEARS_ON_PAGE; i++) {
        years[i] = (first + i).toString();
      }
      return years;
    }
  }, {
    key: 'getActiveYearPosition',
    value: function getActiveYearPosition() {
      /*
        Return position of a year that should be displayed as active
        (position in array returned by `this.buildYears`).
      */
      if (!_lodash2.default.isNil(this.props.value)) {
        var years = this.buildYears();
        var yearIndex = years.indexOf(this.props.value.year().toString());
        if (yearIndex >= 0) {
          return yearIndex;
        }
      }
    }
  }, {
    key: 'getDisabledYearsPositions',
    value: function getDisabledYearsPositions() {
      /*
        Return position numbers of years that should be displayed as disabled
        (position in array returned by `this.buildYears`).
      */
      var disabled = [];
      var years = this.buildYears();
      if (_lodash2.default.isArray(this.props.enable)) {
        var enabledYears = this.props.enable.map(function (yearMoment) {
          return yearMoment.year().toString();
        });
        disabled = _lodash2.default.concat(disabled, years.filter(function (year) {
          return !_lodash2.default.includes(enabledYears, year);
        }).map(function (year) {
          return years.indexOf(year);
        }));
      }
      if (_lodash2.default.isArray(this.props.disable)) {
        disabled = _lodash2.default.concat(disabled, this.props.disable.filter(function (yearMoment) {
          return _lodash2.default.includes(years, yearMoment.year().toString());
        }).map(function (yearMoment) {
          return years.indexOf(yearMoment.year().toString());
        }));
      }
      if (!_lodash2.default.isNil(this.props.maxDate)) {
        if (parseInt(_lodash2.default.first(years)) > this.props.maxDate.year()) {
          disabled = _lodash2.default.range(0, years.length);
        } else if (_lodash2.default.includes(years, this.props.maxDate.year().toString())) {
          disabled = _lodash2.default.concat(disabled, _lodash2.default.range(years.indexOf(this.props.maxDate.year().toString()) + 1, years.length));
        }
      }
      if (!_lodash2.default.isNil(this.props.minDate)) {
        if (parseInt(_lodash2.default.last(years)) < this.props.minDate.year()) {
          disabled = _lodash2.default.range(0, years.length);
        } else if (_lodash2.default.includes(years, this.props.minDate.year().toString())) {
          disabled = _lodash2.default.concat(disabled, _lodash2.default.range(0, years.indexOf(this.props.minDate.year().toString())));
        }
      }
      if (disabled.length > 0) {
        return _lodash2.default.uniq(disabled);
      }
    }
  }, {
    key: 'isNextPageAvailable',
    value: function isNextPageAvailable() {
      var _props = this.props,
          maxDate = _props.maxDate,
          enable = _props.enable;

      var lastOnPage = parseInt(_lodash2.default.last(this.buildYears()));

      if (_lodash2.default.isArray(enable)) {
        return _lodash2.default.some(enable, function (enabledYear) {
          return enabledYear.year() > lastOnPage;
        });
      }
      if (_lodash2.default.isNil(maxDate)) return true;
      return lastOnPage < maxDate.year();
    }
  }, {
    key: 'isPrevPageAvailable',
    value: function isPrevPageAvailable() {
      var _props2 = this.props,
          minDate = _props2.minDate,
          enable = _props2.enable;

      var firstOnPage = parseInt(_lodash2.default.first(this.buildYears()));

      if (_lodash2.default.isArray(enable)) {
        return _lodash2.default.some(enable, function (enabledYear) {
          return enabledYear.year() < firstOnPage;
        });
      }
      if (_lodash2.default.isNil(minDate)) return true;
      return firstOnPage > minDate.year();
    }
  }, {
    key: 'render',
    value: function render() {
      var rest = (0, _lib.getUnhandledProps)(YearPicker, this.props);
      return _react2.default.createElement(_YearView2.default, _extends({}, rest, {
        years: this.buildYears(),
        onNextPageBtnClick: this.switchToNextPage,
        onPrevPageBtnClick: this.switchToPrevPage,
        onYearClick: this.handleChange,
        hasPrevPage: this.isPrevPageAvailable(),
        hasNextPage: this.isNextPageAvailable(),
        disabled: this.getDisabledYearsPositions(),
        active: this.getActiveYearPosition() }));
    }
  }]);

  return YearPicker;
}(_react2.default.Component);

YearPicker.handledProps = ['disable', 'enable', 'initializeWith', 'maxDate', 'minDate', 'onChange', 'value'];


YearPicker.propTypes = {
  /** Called after year is selected. */
  onChange: _propTypes2.default.func.isRequired,
  /** A value for initializing year picker's state. */
  initializeWith: _propTypes2.default.instanceOf(_moment2.default).isRequired,
  /** Currently selected year. */
  value: _propTypes2.default.instanceOf(_moment2.default),
  /** Array of disabled years. */
  disable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Array of enabled years. */
  enable: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /** Minimal year that could be selected. */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /** Maximal year that could be selected. */
  maxDate: _propTypes2.default.instanceOf(_moment2.default)
};

exports.default = YearPicker;