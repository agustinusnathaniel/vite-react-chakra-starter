import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate('/');

  return (
    <Grid gap={4} textAlign="center">
      <Heading>Page not Found</Heading>

      <Box maxWidth={[280, 400]} marginX="auto">
        <Image width={400} src="/assets/404 Error-rafiki.svg" />
        <Link
          fontSize="xs"
          href="https://stories.freepik.com/web"
          target="_blank"
          rel="noopener noreferrer"
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
