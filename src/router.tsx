import { createRouter } from '@tanstack/react-router';

import Page404 from '@/lib/pages/404';
import { queryClient } from '@/lib/services/constants';

import { routeTree } from './routeTree.gen';

// TanStack Start's client entry: the plugin resolves `src/router.tsx` and
// hydrates the router returned by `getRouter` into the document shell.
// biome-ignore lint/suspicious/useAwait: Start's client hydration awaits getRouter(); async is the framework contract.
export async function getRouter() {
  const router = createRouter({
    context: {
      queryClient,
    },
    defaultNotFoundComponent: () => <Page404 />,
    defaultPendingComponent: () => (
      <div className="mx-auto">
        <p>Loading...</p>
      </div>
    ),
    defaultPreload: 'intent',
    defaultStructuralSharing: true,
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
