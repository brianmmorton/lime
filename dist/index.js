"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider = function Provider(skeleton) {
  _classCallCheck(this, Provider);

  this.deps = skeleton.slice(0, skeleton.length - 1);
  this.fn = skeleton[skeleton.length - 1];
};

var Injector = function () {
  function Injector() {
    _classCallCheck(this, Injector);

    this.providers = new Map();
  }

  _createClass(Injector, [{
    key: "add",
    value: function add(token, skeleton) {
      this.providers.set(token, new Provider(skeleton));
    }
  }, {
    key: "get",
    value: function get(token) {
      var p = this.providers.get(token);
      if (!p) {
        throw "Provider not found";
      } else {
        return p;
      }
    }
  }, {
    key: "run",
    value: function run(token) {
      var provider = this.get(token);
      var deps = provider.deps;

      var args = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = deps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dep = _step.value;

          var result = Promise.resolve(this.run(dep));
          args.push(result);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Promise.all(args).then(function (resArgs) {
        return provider.fn.apply(provider, _toConsumableArray(resArgs));
      });
    }
  }]);

  return Injector;
}();

exports.Injector = Injector;
