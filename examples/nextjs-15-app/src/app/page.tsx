import { IntlayerProvider } from '@providers/IntlayerProvider';
import { HomeContent } from '@components/HomeContent';

const Home = async () => (
  <IntlayerProvider>
    <HomeContent />
  </IntlayerProvider>
);

export default Home;
