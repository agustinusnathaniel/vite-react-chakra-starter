import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      align="center"
      alignSelf="flex-end"
      as="footer"
      justifyContent="center"
      width="full"
    >
      <Text fontSize="xs">
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://agustinusnathaniel.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          agustinusnathaniel.com
        </Link>
      </Text>
    </Flex>
  );
};
