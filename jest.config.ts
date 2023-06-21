import type { Config } from "jest";

const config: Config = {
  verbose: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/docs/"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/docs/"],
};

export default config;
