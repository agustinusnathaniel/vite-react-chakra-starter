import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate({ to: '/' });

  return (
    <Grid gap={4} textAlign="center">
      <Heading>Page not Found</Heading>

      <Box marginX="auto" maxWidth={[280, 400]}>
        <Image src="/assets/404 Error-rafiki.svg" width={400} />
        <Link
          fontSize="xs"
          href="https://stories.freepik.com/web"
          rel="noopener noreferrer"
          target="_blank"
        >
          Illustration by Freepik Stories
        </Link>
      </Box>

      <Box>
        <Text>It&apos;s Okay!</Text>
        <Button onClick={handleBackToHome}>Let&apos;s Head Back</Button>
      </Box>
    </Grid>
  );
};

export default Page404;
