import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: "jest-environment-jsdom",
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/jest.env.setup.ts'], // Add this line
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)

// ---------------------------------------------------------------- //
// old config -----------------------------------------------------
// ---------------------------------------------------------------- //
// ---------------------------------------------------------------- //

// const nextJest = require("next/jest");
// const createJestConfig = nextJest({
//   dir: "./",
// });

// const customJestConfig = {
//   moduleDirectories: ["node_modules", "<rootDir>/"],
//   testEnvironment: "jest-environment-jsdom",
//   coverageProvider: "v8",
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
// };

// module.exports = createJestConfig(customJestConfig);