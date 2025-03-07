const { getDefaultConfig } = require('expo/metro-config');
const { configMetroIntlayer } = require('react-native-intlayer');

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  return await configMetroIntlayer(defaultConfig);
})();
