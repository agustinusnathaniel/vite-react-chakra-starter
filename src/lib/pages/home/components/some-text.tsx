import { Grid, Heading, Text } from '@chakra-ui/react';

export const SomeText = () => (
  <Grid gap={2} textAlign="center">
    <Heading fontWeight="extrabold" size="2xl">
      vite-react-chakra-starter
    </Heading>
    <Text textStyle="sm">
      This is a vite react template with Chakra-UI and TypeScript setup.
    </Text>
  </Grid>
);
