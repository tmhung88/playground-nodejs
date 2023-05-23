module.exports = {
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  coverageDirectory: '<rootDir>/../coverage',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1'
  }
}
