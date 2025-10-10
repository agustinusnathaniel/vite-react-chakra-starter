import { createFileRoute } from '@tanstack/react-router';

import Home from '@/lib/pages/home';

export const Route = createFileRoute('/')({
  component: Home,
});
