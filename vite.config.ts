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
  manifest: {
    background_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    lang: 'en',
    name: 'Vite React App Template',
    prefer_related_applications: false,
    short_name: 'vite-react-chakra-starter',
    start_url: '/',
    theme_color: '#FFFFFF',
  },
  pwaAssets: {
    config: true,
    disabled: false,
  },
  registerType: 'autoUpdate',
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCheckDisabled = mode === 'production' || !!process.env.VITEST;
  const env = loadEnv(mode, process.cwd(), '');
  const isReactCompilerEnabled = env.ENABLE_PLUGIN_REACT_COMPILER === 'true';

  return {
    fmt: {
      // disable vp fmt
      ignorePatterns: ['**/*'],
      singleQuote: true,
    },
    lint: {
      // disable vp check
      ignorePatterns: ['**/*'],
      options: { typeAware: true, typeCheck: true },
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
    staged: {
      '*.{ts,js,json,md}': ['ultracite fix'],
      'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['ultracite fix'],
    },
    test: {
      coverage: {
        include: ['src/lib/utils/**/**.{ts,tsx,js,jsx}'],
      },
    },
  };
});
