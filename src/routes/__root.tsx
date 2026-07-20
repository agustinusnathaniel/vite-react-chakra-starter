import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Layout } from '@/lib/layout';

const title = 'Vite React Chakra Starter';
const description = 'app starter template';
const url = 'https://vite-react-chakra-starter.sznm.dev';
const ogImgUrl =
  'https://og.sznm.dev/api/generate?heading=vite-react-chakra-starter&text=React+vite+template+with+Chakra+UI+and+TypeScript+setup.&template=color';

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Layout>
        <Outlet />
      </Layout>
      {import.meta.env.VITE_ENABLE_TANSTACK_DEVTOOLS ? (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      ) : null}
    </>
  ),
  head: () => ({
    links: [
      {
        href: '/favicon.ico',
        rel: 'icon',
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
        content: '#000000',
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
