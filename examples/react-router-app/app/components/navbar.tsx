import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '~/hooks/useLocalizedNavigate';
import { LocalizedLink } from './localized-link';

export const Navbar = () => {
  const { home, about } = useIntlayer('navbar');
  const navigate = useLocalizedNavigate();

  return (
    <nav className="flex gap-2">
      <div className="flex gap-2">
        <LocalizedLink to="/">{home}</LocalizedLink>
        <LocalizedLink to="/about">{about}</LocalizedLink>
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigate('/')}>{home} (navigate)</button>
        <button onClick={() => navigate('/about')}>{about} (navigate)</button>
      </div>
    </nav>
  );
};
