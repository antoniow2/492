const path = require('path');

module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.css$': path.join(__dirname, 'empty_module', 'empty-module.js'),
    },
};
  