'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cellStyleWidth3 = {
  width: '33.333333%',
  minWidth: '7em'
};

var cellStyleWidth4 = {
  width: '25%'
};

var cellStyleWidth7 = {
  width: '14.285714%'
};

function buildRows(data /*array*/, width /*number*/) {
  var height = data.length / width;
  var rows = [];
  for (var i = 0; i < height; i++) {
    rows.push(data.slice(i * width, i * width + width));
  }
  return rows;
}

function isActive(rowIndex, rowWidth, colIndex, active) {
  if (_lodash2.default.isNil(active)) return false;
  if (_lodash2.default.isArray(active)) {
    for (var i = 0; i < active.length; i++) {
      if (rowIndex * rowWidth + colIndex === active[i]) return true;
    }
  }
  return rowIndex * rowWidth + colIndex === active;
}

function isDisabled(rowIndex, rowWidth, colIndex, disabledIndexes) {
  if (_lodash2.default.isNil(disabledIndexes) || disabledIndexes.length === 0) return false;
  for (var i = 0; i < disabledIndexes.length; i++) {
    if (rowIndex * rowWidth + colIndex === disabledIndexes[i]) return true;
  }
  return false;
}

function getCellStyle(width) {
  if (width === '3') {
    return cellStyleWidth3;
  }
  if (width === '4') {
    return cellStyleWidth4;
  }
  if (width === '7') {
    return cellStyleWidth7;
  }
  return;
}

function Body(props) {
  var data = props.data,
      width = props.width,
      onCellClick = props.onCellClick,
      active = props.active,
      disabled = props.disabled;

  var content = buildRows(data, parseInt(width)).map(function (row, rowIndex) {
    return _react2.default.createElement(
      _semanticUiReact.Table.Row,
      { key: '' + rowIndex + row[0] },
      row.map(function (item, itemIndex) {
        return _react2.default.createElement(_Cell2.default, {
          style: getCellStyle(width),
          active: isActive(rowIndex, parseInt(width), itemIndex, active),
          disabled: isDisabled(rowIndex, parseInt(width), itemIndex, disabled),
          key: '' + (rowIndex * width + itemIndex),
          itemPosition: rowIndex * width + itemIndex,
          content: item,
          onClick: onCellClick });
      })
    );
  });
  return _react2.default.createElement(
    _semanticUiReact.Table.Body,
    null,
    content
  );
}

Body.handledProps = ['active', 'data', 'disabled', 'onCellClick', 'width'];
Body.propTypes = {
  /** A number of columns in a row. */
  width: _propTypes2.default.oneOf(['3', '4', '7']).isRequired,
  /** Data that is used to fill a calendar. */
  data: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.arrayOf(_propTypes2.default.number)]).isRequired,
  /** Called after a click on calendar's cell. */
  onCellClick: _propTypes2.default.func,
  /** Index of an element (or array of indexes) in `data` array that should be displayed as active. */
  active: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
  /** Array of element indexes in `data` array that should be displayed as disabled. */
  disabled: _propTypes2.default.arrayOf(_propTypes2.default.number)
};

exports.default = Body;