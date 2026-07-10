import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import babel from '@rolldown/plugin-babel';
import { devtools as tanstackDevtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import type { PluginOption } from 'vite-plus';
import { defineConfig, lazyPlugins, loadEnv } from 'vite-plus';

const pwaOptions: Partial<VitePWAOptions> = {
  // TODO: enable if you want to enable PWA service worker
  disable: true,
  registerType: 'autoUpdate',
  manifest: {
    short_name: 'vite-react-chakra-starter',
    name: 'Vite React App Template',
    lang: 'en',
    start_url: '/',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    prefer_related_applications: false,
  },
  pwaAssets: {
    disabled: false,
    config: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCheckDisabled = mode === 'production' || !!process.env.VITEST;
  const env = loadEnv(mode, process.cwd(), '');
  const isReactCompilerEnabled = env.ENABLE_PLUGIN_REACT_COMPILER === 'true';

  return {
    lint: {
      options: { typeAware: true, typeCheck: true },
      // disable vp check
      ignorePatterns: ['**/*'],
    },
    fmt: {
      singleQuote: true,
      // disable vp fmt
      ignorePatterns: ['**/*'],
    },
    staged: {
      'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['ultracite fix'],
      '*.{ts,js,json,md}': ['ultracite fix'],
    },
    plugins: lazyPlugins(() => [
      tanstackDevtools(),
      ValidateEnv(),
      tanstackRouter({ autoCodeSplitting: true }),
      react(),
      ...(isReactCompilerEnabled
        ? [
            babel({
              presets: [reactCompilerPreset()],
            }),
          ]
        : []),
      ...(isCheckDisabled
        ? []
        : [
            checker({
              typescript: true,
            }),
          ]),
      visualizer({ template: 'sunburst' }) as unknown as PluginOption,
      VitePWA(pwaOptions),
    ]),
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      coverage: {
        include: ['src/lib/utils/**/**.{ts,tsx,js,jsx}'],
      },
    },
  };
});
