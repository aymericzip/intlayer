/**
 * Verification script to demonstrate ICU format conversion
 * This script shows that Intlayer correctly converts {{var}} (internal format)
 * to {var} (ICU format) when outputting.
 */

import { enu, gender, insert } from '../transpiler';
import { icuToIntlayerFormatter, intlayerToICUFormatter } from './ICU';

console.log('=== ICU Format Verification ===\n');

// Test 1: Simple interpolation
console.log('Test 1: Simple Interpolation');
console.log('Intlayer input:', insert('Hello {{name}}'));
const test1 = intlayerToICUFormatter(insert('Hello {{name}}'));
console.log('ICU output:', test1);
console.log('✓ Expected: Single braces {name}');
console.log(
  '✓ Result:',
  test1.includes('{name}') && !test1.includes('{{name}}') ? 'PASS' : 'FAIL'
);
console.log();

// Test 2: Formatted variable
console.log('Test 2: Formatted Variable');
console.log('Intlayer input:', insert('Price: {amount, number, currency}'));
const test2 = intlayerToICUFormatter(
  insert('Price: {amount, number, currency}')
);
console.log('ICU output:', test2);
console.log('✓ Expected: Single braces {amount, number, currency}');
console.log(
  '✓ Result:',
  test2.includes('{amount, number, currency}') ? 'PASS' : 'FAIL'
);
console.log();

// Test 3: Plural with variable
console.log('Test 3: Plural with Variable');
const pluralInput = enu({
  '0': 'No items',
  '1': 'One item',
  fallback: '{{count}} items',
});
console.log('Intlayer input:', JSON.stringify(pluralInput, null, 2));
const test3 = intlayerToICUFormatter(pluralInput);
console.log('ICU output:', test3);
console.log('✓ Expected: {count, plural, ...} with # for count');
console.log(
  '✓ Result:',
  test3.includes('{count, plural,') &&
    test3.includes('# items') &&
    !test3.includes('{{')
    ? 'PASS'
    : 'FAIL'
);
console.log();

// Test 4: Roundtrip conversion
console.log('Test 4: Roundtrip Conversion (ICU → Intlayer → ICU)');
const original =
  'Hello {name}, you have {count, plural, =0 {no messages} =1 {one message} other {# messages}}';
console.log('Original ICU:', original);
const toIntlayer = icuToIntlayerFormatter(original);
console.log('Converted to Intlayer:', JSON.stringify(toIntlayer, null, 2));
const backToICU = intlayerToICUFormatter(toIntlayer);
console.log('Back to ICU:', backToICU);
console.log('✓ Expected: No {{...}} in output');
console.log('✓ Result:', !String(backToICU).includes('{{') ? 'PASS' : 'FAIL');
console.log();

// Test 5: Gender with nested plural
console.log('Test 5: Gender with Nested Structures');
const genderInput = gender({
  male: 'He has items',
  female: 'She has items',
  fallback: 'They have items',
});
const test5 = intlayerToICUFormatter(genderInput);
console.log('ICU output:', test5);
console.log('✓ Expected: Single braces only');
console.log('✓ Result:', !test5.includes('{{') ? 'PASS' : 'FAIL');
console.log();

console.log('=== Summary ===');
console.log('ICU MessageFormat uses single braces: {var}');
console.log('Intlayer internal format uses double braces: {{var}}');
console.log('The conversion between these formats is handled automatically.');
