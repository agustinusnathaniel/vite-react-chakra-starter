import { createSystem, defaultConfig } from '@chakra-ui/react';

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: 'Plus Jakarta Sans Variable, sans-serif' },
        heading: { value: 'Plus Jakarta Sans Variable, sans-serif' },
      },
    },
  },
});
