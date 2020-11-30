'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Css = require('./Css');

var _Css2 = _interopRequireDefault(_Css);

var _JsonToHtml = require('./JsonToHtml');

var _JsonToHtml2 = _interopRequireDefault(_JsonToHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JsonTable = function (_React$Component) {
  _inherits(JsonTable, _React$Component);

  function JsonTable() {
    _classCallCheck(this, JsonTable);

    return _possibleConstructorReturn(this, (JsonTable.__proto__ || Object.getPrototypeOf(JsonTable)).apply(this, arguments));
  }

  _createClass(JsonTable, [{
    key: 'render',
    value: function render() {
      var htmlTable = _JsonToHtml2.default.getTable(this.props.json);

      return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: htmlTable } });
    }
  }]);

  return JsonTable;
}(_react2.default.Component);

exports.default = JsonTable;