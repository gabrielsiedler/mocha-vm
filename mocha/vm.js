/** This file runs the Mocha runner in a sandboxed environment  */
const { NodeVM } = require('vm2');
const mocha = require('mocha');
global.expect = require('chai').expect;

function vm(options) {
  const external = ['mocha'];
  const builtin = ['path', 'util', 'fs'];

  if (options) {
    const library = options.library ? options.library : options;
    switch (library) {
      case 'chai':
        external.push(library);
        break;
      case 'assert':
        builtin.push(library);
        break;
      default:
        break;
    }
  }

  const nodevm = new NodeVM({
    console: 'inherit',
    sandbox: { mocha },
    require: {
      external,
      builtin,
    },
    root: __dirname,
  });
  return nodevm;
}

module.exports = vm;
