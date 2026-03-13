import babel from '@rolldown/plugin-babel';
import { devtools as tanstackDevtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import checker from 'vite-plugin-checker';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import type { PluginOption } from 'vite-plus';
import { defineConfig } from 'vite-plus';

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
  return {
    lint: { options: { typeAware: true, typeCheck: true } },
    staged: {
      'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': [
        'biome check --write --no-errors-on-unmatched --error-on-warnings',
      ],
      '*.{ts,js,json,md}': [
        'biome check --write --no-errors-on-unmatched --error-on-warnings',
      ],
    },
    plugins: [
      tanstackDevtools(),
      tanstackRouter({ autoCodeSplitting: true }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      ...(!isCheckDisabled
        ? [
            checker({
              typescript: true,
            }),
          ]
        : []),
      visualizer({ template: 'sunburst' }) as unknown as PluginOption,
      VitePWA(pwaOptions),
    ],
    server: {
      port: 3000,
      open: true,
    },
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
