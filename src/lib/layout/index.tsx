import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Footer } from './components/footer';
import { Header } from './components/header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
    <Flex margin="8" minHeight="90vh" wrap="wrap">
      <Header />
      <Box as="main" marginY={22} width="full">
        {children}
      </Box>
      <Footer />
    </Flex>
  </Box>
);
