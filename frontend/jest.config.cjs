// // module.exports = {
// //   testEnvironment: "jsdom",
// //   setupFiles: ["./jest.setup.js"],
// //   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // 👈 Use setupFilesAfterEnv
// // };

// const nextJest = require("next/jest");

// // Providing the path to your Next.js app which will enable loading next.config.js and .env files
// const createJestConfig = nextJest({ dir: "./" });

// // Any custom config you want to pass to Jest
// const customJestConfig = {
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["@testing-library/jest-dom/"],
// };
// // createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
// module.exports = createJestConfig(customJestConfig);

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // ✅ Ensure Jest loads setup files
};
