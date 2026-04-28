import { Grid } from '@chakra-ui/react';

import { CTASection } from './components/cta-section';
import { SomeImage } from './components/some-image';
import { SomeText } from './components/some-text';

const Home = () => (
  <Grid gap={4}>
    <SomeText />
    <SomeImage />
    <CTASection />
  </Grid>
);

export default Home;
