module.exports = {
    // ...
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.[t|j]sx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  };
  