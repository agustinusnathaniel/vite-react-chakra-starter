import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx'],
  ignore: ['src/**/*.gen.ts'],
  ignoreBinaries: ['changelogithub'],
  project: ['src/**/*.{ts,tsx,js,jsx,css,scss}'],
};

export default config;
