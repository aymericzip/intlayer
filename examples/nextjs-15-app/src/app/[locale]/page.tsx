import { IntlayerProvider } from '@providers/IntlayerProvider';
import { HomeContent } from '@components/HomeContent';

const Home = () => (
  <IntlayerProvider>
    <HomeContent />
  </IntlayerProvider>
);

export default Home;
