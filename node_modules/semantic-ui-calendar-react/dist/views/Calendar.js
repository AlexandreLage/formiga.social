'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Calendar(props) {
  return _react2.default.createElement(
    _semanticUiReact.Table,
    {
      unstackable: true,
      celled: true,
      textAlign: 'center' },
    props.children
  );
}

Calendar.handledProps = ['children'];
Calendar.propTypes = {
  children: _propTypes2.default.node.isRequired
};

exports.default = Calendar;