'use client';

import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { Input } from '@intlayer/design-system/input';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { ChevronDown } from 'lucide-react';
import { type FC, useCallback, useMemo, useRef, useState } from 'react';

export type Country = { code: string; name: string };

// Full Stripe Connect supported country list
export const STRIPE_COUNTRIES: Country[] = [
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AO', name: 'Angola' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia & Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CA', name: 'Canada' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao SAR China' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MT', name: 'Malta' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PA', name: 'Panama' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SM', name: 'San Marino' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KR', name: 'South Korea' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TT', name: 'Trinidad & Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VN', name: 'Vietnam' },
];

const toFlag = (code: string) =>
  [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join('');

const FUSE_OPTIONS: IFuseOptions<Country> = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'code', weight: 0.3 },
  ],
  threshold: 0.3,
};

const DROPDOWN_ID = 'country-selector';

type CountrySelectorProps = {
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
};

export const CountrySelector: FC<CountrySelectorProps> = ({
  value,
  onChange,
  placeholder = 'Select your country…',
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => new Fuse(STRIPE_COUNTRIES, FUSE_OPTIONS), []);

  const results = useMemo<Country[]>(
    () =>
      query.trim()
        ? fuse.search(query.trim()).map((r) => r.item)
        : STRIPE_COUNTRIES,
    [fuse, query]
  );

  const selected = STRIPE_COUNTRIES.find((c) => c.code === value) ?? null;

  const handleSelect = useCallback(
    (code: string) => {
      onChange(code);
      setQuery('');
      // Close dropdown by blurring the container
      (document.activeElement as HTMLElement | null)?.blur();
    },
    [onChange]
  );

  return (
    <DropDown identifier={DROPDOWN_ID} className="w-full">
      <DropDown.Trigger
        identifier={DROPDOWN_ID}
        variant="outline"
        color="text"
        className="flex w-full flex-row justify-between px-3 py-2 font-normal"
        label="Open country selector"
        IconRight={ChevronDown}
        onClick={() => setTimeout(() => inputRef.current?.focus(), 0)}
      >
        {selected ? (
          <div className="flex items-center gap-6 p-1">
            <span className="text-base leading-none">
              {toFlag(selected.code)}
            </span>
            <span>{selected.name}</span>
          </div>
        ) : (
          <span className="text-text/50">{placeholder}</span>
        )}
      </DropDown.Trigger>

      <DropDown.Panel
        identifier={DROPDOWN_ID}
        isOverable
        isFocusable
        className="z-50 w-full"
      >
        <Container
          className="max-h-72 min-w-56 border border-text/10"
          roundedSize="xl"
          transparency="xs"
          separator="y"
        >
          <div className="p-2">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8 text-sm"
            />
          </div>

          <ul className="separator-y separator-text/10 overflow-y-auto p-1">
            {results.length === 0 ? (
              <li className="px-3 py-2 text-neutral/50 text-sm">No results</li>
            ) : (
              results.map(({ code, name }) => (
                <li key={code}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-text/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text/20"
                    onClick={() => handleSelect(code)}
                  >
                    <div className="flex w-full items-center gap-6 p-1">
                      <span className="text-base leading-none">
                        {toFlag(code)}
                      </span>
                      <span>{name}</span>
                      <span className="ml-auto text-neutral/40 text-xs">
                        {code}
                      </span>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
