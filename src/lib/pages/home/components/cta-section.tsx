import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';

import { Button } from '@/lib/components/ui/button';

const repoName = 'vite-react-chakra-starter';
const repoLink = `https://github.com/agustinusnathaniel/${repoName}`;

export const CTASection = () => (
  <Box textAlign="center">
    <Flex marginY={4} justifyContent="center" gridGap={2}>
      <Button asChild size="sm">
        <Link
          href={`${repoLink}/generate`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Use This Template
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={repoLink} target="_blank" rel="noopener noreferrer">
          <AiFillGithub /> Open in Github
        </Link>
      </Button>
    </Flex>
    <Flex marginY={4} justifyContent="center" gridGap={2}>
      <Link
        aria-label="Deploy to Vercel"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://vercel.com/import/git?s=${repoLink}`}
      >
        <Image
          src="https://vercel.com/button"
          height="32px"
          alt="Vercel deploy button"
        />
      </Link>
      <Link
        aria-label="Deploy to Netlify"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://app.netlify.com/start/deploy?repository=${repoLink}`}
      >
        <Image
          src="https://www.netlify.com/img/deploy/button.svg"
          alt="Netlify deploy button"
          height="32px"
        />
      </Link>
    </Flex>
  </Box>
);
