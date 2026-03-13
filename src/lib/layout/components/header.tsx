import { Box, Flex } from '@chakra-ui/react';

import { ColorModeButton } from '@/lib/components/ui/color-mode';

export const Header = () => {
  return (
    <Flex
      align="center"
      alignSelf="flex-start"
      as="header"
      gridGap={2}
      justifyContent="center"
      width="full"
    >
      <Box marginLeft="auto">
        <ColorModeButton />
      </Box>
    </Flex>
  );
};
