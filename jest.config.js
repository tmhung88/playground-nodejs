const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    ...tsjPreset.transform,
  },
  coverageDirectory: '<rootDir>/../coverage',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
}
