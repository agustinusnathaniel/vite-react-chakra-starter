import { Flex, Image } from '@chakra-ui/react';

const ICON_SIZE = 22;

export const SomeImage = () => {
  return (
    <Flex alignItems="center" gridGap={2} justifyContent="center" marginY={4}>
      <Image
        height={ICON_SIZE}
        src="/assets/vite-logo.svg"
        title="vite"
        width={ICON_SIZE}
      />
      <Image
        height={ICON_SIZE}
        src="/assets/react-icon.svg"
        title="react"
        width={ICON_SIZE}
      />
      <Image
        height={ICON_SIZE}
        src="/assets/chakra-ui-logomark-colored.svg"
        title="Chakra UI"
        width={ICON_SIZE}
      />
      <Image
        height={ICON_SIZE}
        src="/assets/ts-logo-512.svg"
        title="TypeScript"
        width={ICON_SIZE}
      />
    </Flex>
  );
};
