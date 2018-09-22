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

var cellStyle = {
  border: 'none'
};

function HeaderRange(props) {
  var content = props.content;

  return _react2.default.createElement(
    _semanticUiReact.Table.Row,
    null,
    _react2.default.createElement(
      _semanticUiReact.Table.HeaderCell,
      { style: cellStyle, colSpan: '7' },
      content
    )
  );
}

HeaderRange.handledProps = ['content'];
HeaderRange.propTypes = {
  /** Selected dates range. */
  content: _propTypes2.default.string.isRequired
};

exports.default = HeaderRange;