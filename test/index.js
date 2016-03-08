
var expect = require('chai').expect;
var mocha = require('mocha');
var assert = require('assert');

var Injector = require('../dist/index').Injector;

describe('Injector', function () {

  it('should return test2 for a single dependency tree', function () {
    var injector = new Injector();
    injector.add('test1', [ function () { return 'test1' } ])
    injector.add('test2', [ 'test1', function (test1) {
      expect(test1).to.equal('test1');
      return 'test2'
    } ])

    injector.run('test2')
  });

  it('should run async test', function () {
    var injector = new Injector();
    injector.add('test1', [ function () {
      return setTimeout(() => 'test1', 100)
    }])
    injector.add('test2', [ 'test1', function (test1) {
      expect(test1).to.equal('test1');
      return 'test2'
    }])

    injector.run('test2')
  });

});
