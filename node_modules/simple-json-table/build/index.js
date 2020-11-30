'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _json2yaml = require('json2yaml');

var _json2yaml2 = _interopRequireDefault(_json2yaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = void 0;

var getValue = function getValue(v) {
  if (typeof v === 'string') {
    return _react2.default.createElement(
      'span',
      { style: styles.valueColumn },
      JSON.stringify(v)
    );
  }

  return _react2.default.createElement(
    'pre',
    { style: styles.valueColumn },
    _json2yaml2.default.stringify(v).replace('---\n', '').replace('---', '')
  );
};

var JSONTable = function JSONTable(_ref) {
  var source = _ref.source;

  return _react2.default.createElement(
    'div',
    { style: styles.container },
    Object.keys(source).map(function (k) {
      return _react2.default.createElement(
        'div',
        { style: styles.row, key: k },
        _react2.default.createElement(
          'span',
          { style: styles.keyColumn },
          k
        ),
        getValue(source[k])
      );
    })
  );
};

JSONTable.defaultProps = {
  source: _propTypes2.default.instanceOf(Object).isRequired
};

styles = {
  row: {
    border: '1px solid #eee',
    textAlign: 'left',
    borderRadius: '3px',
    margin: '.3rem 0',
    display: 'block',
    width: '100%'
  },
  keyColumn: {
    backgroundColor: '#efefef',
    padding: '1rem',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '100%',
    fontWeight: 600
  },
  valueColumn: {
    padding: '1rem',
    display: 'inline-block',
    verticalAlign: 'top',
    margin: 0,
    wordWrap: 'break-word',
    fontSize: '1rem'
  },
  container: {
    padding: '1rem',
    border: '1px solid #eee'
  }
};

exports.default = JSONTable;