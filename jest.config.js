/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  projects: [
    {
      displayName: "dom",
      testEnvironment: "jsdom",
      preset: 'ts-jest',
      verbose: true,
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
      transformIgnorePatterns: ['<rootDir>/node_modules/'],
      collectCoverage: true
    },
    {
      displayName: "node",
      testEnvironment: 'node',
      preset: 'ts-jest',
      verbose: true,
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
      transformIgnorePatterns: ['<rootDir>/node_modules/'],
      collectCoverage: true
    }
  ]
};