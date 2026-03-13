import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { Meta } from './components/meta';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Meta />
      <Flex margin="8" minHeight="90vh" wrap="wrap">
        <Header />
        <Box as="main" marginY={22} width="full">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};
