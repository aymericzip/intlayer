import { describe, expect, it } from 'vitest';
import { detectExportedComponentName } from './detectExportedComponentName';

describe('detectExportedComponentName', () => {
  it.each([
    ['export default function Header() {}', 'Header'],
    ['export default async function Dashboard() {}', 'Dashboard'],
    ['export default class Banner extends Component {}', 'Banner'],
    ['export default memo(function Card() {})', 'Card'],
    ['export default React.forwardRef(function Input() {})', 'Input'],
    ['const Footer = () => null;\nexport default memo(Footer);', 'Footer'],
    ['const Footer = () => null;\nexport default Footer;', 'Footer'],
    ['module.exports = Sidebar;', 'Sidebar'],
    ['export const metadata = {};\nexport const Hero = () => null;', 'Hero'],
    ['export async function Navbar() {}', 'Navbar'],
  ])('%s -> %s', (fileText, expectedName) => {
    expect(detectExportedComponentName(fileText)).toBe(expectedName);
  });

  it.each([
    'export default function () {}',
    'export default async function () {}',
    'export default () => null;',
    'export default memo(() => null);',
    "export const Route = createFileRoute('/')({ component: Home });",
    'export default async function Page() {}',
    'export default function RootLayout() {}',
    'export const loader = () => {};',
  ])('returns null for %s', (fileText) => {
    expect(detectExportedComponentName(fileText)).toBeNull();
  });
});
