import { describe, expect, it } from 'vitest';
import { kebabCaseToCamelCase } from './kebabCaseToCamelCase';

describe('kebabCaseToCamelCase', () => {
  describe('basic kebab case conversion', () => {
    it('should convert simple kebab case to camelCase', () => {
      expect(kebabCaseToCamelCase('hello-world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my-component')).toBe('MyComponent');
      expect(kebabCaseToCamelCase('user-profile-page')).toBe('UserProfilePage');
      expect(kebabCaseToCamelCase('auth-middleware')).toBe('AuthMiddleware');
    });

    it('should handle single words', () => {
      expect(kebabCaseToCamelCase('hello')).toBe('Hello');
      expect(kebabCaseToCamelCase('component')).toBe('Component');
    });

    it('should handle multiple consecutive separators', () => {
      expect(kebabCaseToCamelCase('hello--world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my---component')).toBe('MyComponent');
      expect(kebabCaseToCamelCase('user----profile')).toBe('UserProfile');
    });
  });

  describe('different separator types', () => {
    it('should handle underscores', () => {
      expect(kebabCaseToCamelCase('hello_world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my_component_name')).toBe('MyComponentName');
    });

    it('should handle spaces', () => {
      expect(kebabCaseToCamelCase('hello world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my component name')).toBe('MyComponentName');
    });

    it('should handle dots', () => {
      expect(kebabCaseToCamelCase('hello.world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my.component.name')).toBe('MyComponentName');
    });

    it('should handle mixed separators', () => {
      expect(kebabCaseToCamelCase('hello-world_component.name')).toBe(
        'HelloWorldComponentName'
      );
      expect(kebabCaseToCamelCase('my_component-name.test')).toBe(
        'MyComponentNameTest'
      );
    });

    it('should handle special characters', () => {
      expect(kebabCaseToCamelCase('hello@world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my#component$name')).toBe('MyComponentName');
      expect(kebabCaseToCamelCase('user+profile&page')).toBe('UserProfilePage');
    });
  });

  describe('numbers handling', () => {
    it('should handle numbers at the beginning', () => {
      expect(kebabCaseToCamelCase('1-hello-world')).toBe('1HelloWorld');
      expect(kebabCaseToCamelCase('123-component')).toBe('123Component');
    });

    it('should handle numbers in the middle', () => {
      expect(kebabCaseToCamelCase('hello-2-world')).toBe('Hello2World');
      expect(kebabCaseToCamelCase('component-v3-test')).toBe('ComponentV3Test');
    });

    it('should handle numbers at the end', () => {
      expect(kebabCaseToCamelCase('hello-world-123')).toBe('HelloWorld123');
      expect(kebabCaseToCamelCase('component-v2')).toBe('ComponentV2');
    });

    it('should capitalize letters following numbers within words', () => {
      expect(kebabCaseToCamelCase('test1hello')).toBe('Test1Hello');
      expect(kebabCaseToCamelCase('component2world')).toBe('Component2World');
      expect(kebabCaseToCamelCase('my3test4case')).toBe('My3Test4Case');
    });

    it('should handle mixed numbers and separators', () => {
      expect(kebabCaseToCamelCase('hello-2world-test')).toBe('Hello2WorldTest');
      expect(kebabCaseToCamelCase('component_v3test_name')).toBe(
        'ComponentV3TestName'
      );
    });
  });

  describe('case handling', () => {
    it('should handle already capitalized words', () => {
      expect(kebabCaseToCamelCase('Hello-World')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('MY-COMPONENT')).toBe('MyComponent');
      expect(kebabCaseToCamelCase('User-Profile-PAGE')).toBe('UserProfilePage');
    });

    it('should handle mixed case words', () => {
      expect(kebabCaseToCamelCase('hELLo-woRLD')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('mY-cOMponent')).toBe('MyComponent');
    });

    it('should handle camelCase input', () => {
      expect(kebabCaseToCamelCase('helloWorld')).toBe('Helloworld');
      expect(kebabCaseToCamelCase('myComponentName')).toBe('Mycomponentname');
      // Note: camelCase input is treated as a single word, so it becomes capitalized but not split
      expect(kebabCaseToCamelCase('authMiddleware')).toBe('Authmiddleware');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(kebabCaseToCamelCase('')).toBe('');
    });

    it('should handle strings with only separators', () => {
      expect(kebabCaseToCamelCase('---')).toBe('');
      expect(kebabCaseToCamelCase('___')).toBe('');
      expect(kebabCaseToCamelCase('...')).toBe('');
      expect(kebabCaseToCamelCase('   ')).toBe('');
    });

    it('should handle strings starting with separators', () => {
      expect(kebabCaseToCamelCase('-hello-world')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('_my_component')).toBe('MyComponent');
      expect(kebabCaseToCamelCase(' user profile')).toBe('UserProfile');
    });

    it('should handle strings ending with separators', () => {
      expect(kebabCaseToCamelCase('hello-world-')).toBe('HelloWorld');
      expect(kebabCaseToCamelCase('my_component_')).toBe('MyComponent');
      expect(kebabCaseToCamelCase('user profile ')).toBe('UserProfile');
    });

    it('should handle single characters', () => {
      expect(kebabCaseToCamelCase('a')).toBe('A');
      expect(kebabCaseToCamelCase('1')).toBe('1');
      expect(kebabCaseToCamelCase('-')).toBe('');
    });

    it('should handle only numbers', () => {
      expect(kebabCaseToCamelCase('123')).toBe('123');
      expect(kebabCaseToCamelCase('1-2-3')).toBe('123');
    });
  });

  describe('specific conversion requirements', () => {
    it('should convert auth-middleware to AuthMiddleware', () => {
      expect(kebabCaseToCamelCase('auth-middleware')).toBe('AuthMiddleware');
    });

    it('should convert authMiddleware to Authmiddleware (current behavior)', () => {
      // Note: This demonstrates current behavior where camelCase input is treated as one word
      // If the requirement is for authMiddleware -> AuthMiddleware, the function would need modification
      expect(kebabCaseToCamelCase('authMiddleware')).toBe('Authmiddleware');
    });
  });

  describe('real-world examples', () => {
    it('should handle file names', () => {
      expect(kebabCaseToCamelCase('my-component.tsx')).toBe('MyComponentTsx');
      expect(kebabCaseToCamelCase('user-profile-page.js')).toBe(
        'UserProfilePageJs'
      );
      expect(kebabCaseToCamelCase('config.test.ts')).toBe('ConfigTestTs');
    });

    it('should handle CSS class names', () => {
      expect(kebabCaseToCamelCase('btn-primary')).toBe('BtnPrimary');
      expect(kebabCaseToCamelCase('navbar-brand-logo')).toBe('NavbarBrandLogo');
      expect(kebabCaseToCamelCase('form-control-lg')).toBe('FormControlLg');
    });

    it('should handle API endpoints', () => {
      expect(kebabCaseToCamelCase('user-profile')).toBe('UserProfile');
      expect(kebabCaseToCamelCase('get-user-data')).toBe('GetUserData');
      expect(kebabCaseToCamelCase('api-v1-users')).toBe('ApiV1Users');
    });

    it('should handle configuration keys', () => {
      expect(kebabCaseToCamelCase('database-connection-string')).toBe(
        'DatabaseConnectionString'
      );
      expect(kebabCaseToCamelCase('max-retry-attempts')).toBe(
        'MaxRetryAttempts'
      );
      expect(kebabCaseToCamelCase('enable-debug-mode')).toBe('EnableDebugMode');
    });
  });
});
