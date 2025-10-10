import { Box, Flex } from '@chakra-ui/react';

import { ColorModeButton } from '@/lib/components/ui/color-mode';

export const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box marginLeft="auto">
        <ColorModeButton />
      </Box>
    </Flex>
  );
};
