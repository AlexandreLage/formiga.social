'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hoverCellStyles = {
  outline: '1px solid #85b7d9',
  cursor: 'pointer'
};

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell(props) {
    _classCallCheck(this, Cell);

    var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));

    _this.toggleHoverCell = function () {
      _this.setState(function (prevState) {
        return { hoverCell: !prevState.hoverCell };
      });
    };

    _this.onCellClick = function (event) {
      _lodash2.default.invoke(_this.props, 'onClick', event, _extends({}, _this.props, { value: _this.props.content }));
    };

    _this.state = {
      hoverCell: false
    };
    return _this;
  }

  _createClass(Cell, [{
    key: 'render',
    value: function render() {
      var rest = (0, _lib.getUnhandledProps)(Cell, this.props);
      var style = _extends({}, this.props.style, this.state.hoverCell ? hoverCellStyles : undefined);
      return _react2.default.createElement(
        _semanticUiReact.Table.Cell,
        _extends({}, rest, {
          style: style,
          onMouseOver: this.toggleHoverCell,
          onMouseLeave: this.toggleHoverCell,
          onClick: this.onCellClick }),
        this.props.content
      );
    }
  }]);

  return Cell;
}(_react2.default.Component);

Cell.handledProps = ['content', 'itemPosition', 'onClick', 'style'];


Cell.propTypes = {
  /** Position of a cell on the page. */
  itemPosition: _propTypes2.default.number.isRequired,
  /** Cell's content. */
  content: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  /** Called after click on a cell. */
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = Cell;
exports.Cell = Cell;