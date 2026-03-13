import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';

import { Button } from '@/lib/components/ui/button';

const repoName = 'vite-react-chakra-starter';
const repoLink = `https://github.com/agustinusnathaniel/${repoName}`;

export const CTASection = () => (
  <Box textAlign="center">
    <Flex gridGap={2} justifyContent="center" marginY={4}>
      <Button asChild size="sm">
        <Link
          href={`${repoLink}/generate`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Use This Template
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={repoLink} rel="noopener noreferrer" target="_blank">
          <AiFillGithub /> Open in Github
        </Link>
      </Button>
    </Flex>
    <Flex gridGap={2} justifyContent="center" marginY={4}>
      <Link
        aria-label="Deploy to Vercel"
        href={`https://vercel.com/import/git?s=${repoLink}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="Vercel deploy button"
          height="32px"
          src="https://vercel.com/button"
        />
      </Link>
      <Link
        aria-label="Deploy to Netlify"
        href={`https://app.netlify.com/start/deploy?repository=${repoLink}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="Netlify deploy button"
          height="32px"
          src="https://www.netlify.com/img/deploy/button.svg"
        />
      </Link>
    </Flex>
  </Box>
);
