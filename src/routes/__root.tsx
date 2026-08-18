import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Provider } from '@/lib/components/ui/provider';
import { Layout } from '@/lib/layout';
import { queryClient } from '@/lib/services/constants';

// fonts
import '@fontsource-variable/plus-jakarta-sans';

const title = 'Vite React Chakra Starter';
const description = 'app starter template';
const url = 'https://vite-react-chakra-starter.sznm.dev';
const ogImgUrl =
  'https://og.sznm.dev/api/generate?heading=vite-react-chakra-starter&text=React+vite+template+with+Chakra+UI+and+TypeScript+setup.&template=color';

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: '/favicon.ico',
        rel: 'icon',
      },
      {
        href: '/favicon.svg',
        rel: 'shortcut icon',
      },
      {
        href: '/apple-touch-icon-180x180.png',
        rel: 'apple-touch-icon',
      },
      {
        href: '/manifest.webmanifest',
        rel: 'manifest',
      },
    ],
    meta: [
      {
        title,
      },
      {
        content: description,
        name: 'description',
      },
      {
        content: 'width=device-width, initial-scale=1.0',
        name: 'viewport',
      },
      {
        content: title,
        name: 'application-name',
      },
      {
        content: 'yes',
        name: 'apple-mobile-web-app-capable',
      },
      {
        content: 'default',
        name: 'apple-mobile-web-app-status-bar-style',
      },
      {
        content: title,
        name: 'apple-mobile-web-app-title',
      },
      {
        content: 'telephone=no',
        name: 'format-detection',
      },
      {
        content: 'yes',
        name: 'mobile-web-app-capable',
      },
      {
        content: '#FFFFFF',
        name: 'theme-color',
      },
      {
        content: 'website',
        name: 'og:type',
      },
      {
        content: url,
        name: 'og:url',
      },
      {
        content: title,
        name: 'og:title',
      },
      {
        content: description,
        name: 'og:description',
      },
      {
        content: ogImgUrl,
        name: 'og:image',
      },
      {
        content: 'summary_large_image',
        name: 'twitter:card',
      },
      {
        content: url,
        name: 'twitter:url',
      },
      {
        content: title,
        name: 'twitter:title',
      },
      {
        content: description,
        name: 'twitter:description',
      },
      {
        content: ogImgUrl,
        name: 'twitter:image',
      },
    ],
  }),
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Outlet />
            </Layout>
          </QueryClientProvider>
        </Provider>
        {import.meta.env.VITE_ENABLE_TANSTACK_DEVTOOLS ? (
          <>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
          </>
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}
