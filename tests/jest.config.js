module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
  };
  