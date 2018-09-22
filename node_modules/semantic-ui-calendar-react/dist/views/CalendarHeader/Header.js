'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _HeaderRange = require('./HeaderRange');

var _HeaderRange2 = _interopRequireDefault(_HeaderRange);

var _HeaderWeeks = require('./HeaderWeeks');

var _HeaderWeeks2 = _interopRequireDefault(_HeaderWeeks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Header(props) {
  var rangeRowContent = props.rangeRowContent,
      displayWeeks = props.displayWeeks,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      hasPrevPage = props.hasPrevPage,
      hasNextPage = props.hasNextPage,
      onHeaderClick = props.onHeaderClick,
      width = props.width,
      title = props.title;


  var cellStyle = {
    border: 'none',
    borderBottom: displayWeeks ? 'none' : '1px solid rgba(34,36,38,.1)'
  };
  var prevPageBtnStyle = {
    cursor: hasPrevPage ? 'pointer' : 'auto'
  };
  var nextPageBtnStyle = {
    cursor: hasNextPage ? 'pointer' : 'auto'
  };
  var headerTitleStyle = {
    cursor: onHeaderClick ? 'pointer' : 'default'
  };

  return _react2.default.createElement(
    _semanticUiReact.Table.Header,
    null,
    !_lodash2.default.isNil(rangeRowContent) && _react2.default.createElement(_HeaderRange2.default, { content: rangeRowContent }),
    _react2.default.createElement(
      _semanticUiReact.Table.Row,
      null,
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        { style: cellStyle, colSpan: '1' },
        _react2.default.createElement(_semanticUiReact.Icon, {
          fitted: true,
          style: prevPageBtnStyle,
          disabled: !hasPrevPage,
          onClick: hasPrevPage ? onPrevPageBtnClick : undefined,
          name: 'chevron left' })
      ),
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        {
          onClick: onHeaderClick ? onHeaderClick : undefined,
          style: cellStyle,
          colSpan: (parseInt(width) - 2).toString() },
        _react2.default.createElement(
          'span',
          { style: headerTitleStyle },
          title
        )
      ),
      _react2.default.createElement(
        _semanticUiReact.Table.HeaderCell,
        { style: cellStyle, colSpan: '1' },
        _react2.default.createElement(_semanticUiReact.Icon, {
          fitted: true,
          style: nextPageBtnStyle,
          disabled: !hasNextPage,
          onClick: hasNextPage ? onNextPageBtnClick : undefined,
          name: 'chevron right' })
      )
    ),
    displayWeeks && _react2.default.createElement(_HeaderWeeks2.default, null)
  );
}

Header.handledProps = ['displayWeeks', 'hasNextPage', 'hasPrevPage', 'onHeaderClick', 'onNextPageBtnClick', 'onPrevPageBtnClick', 'rangeRowContent', 'title', 'width'];
Header.propTypes = {
  /** Header text content. */
  title: _propTypes2.default.string.isRequired,
  /** Called after click on next page button. */
  onNextPageBtnClick: _propTypes2.default.func.isRequired,
  /** Called after click on previous page button. */
  onPrevPageBtnClick: _propTypes2.default.func.isRequired,
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: _propTypes2.default.bool.isRequired,
  /** Whether to display next page button as active or disabled. */
  hasNextPage: _propTypes2.default.bool.isRequired,
  /** Whether to display weeks row or not. */
  displayWeeks: _propTypes2.default.bool.isRequired,
  /** Header width. */
  width: _propTypes2.default.oneOf(['3', '4', '7']).isRequired,
  /** Text content to display in dates-range row. */
  rangeRowContent: _propTypes2.default.string,
  /** Called after click on calendar header. */
  onHeaderClick: _propTypes2.default.func
};

exports.default = Header;