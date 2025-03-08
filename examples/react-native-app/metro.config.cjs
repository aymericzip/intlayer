const { getDefaultConfig } = require('expo/metro-config');
const { configMetroIntlayer } = require('react-native-intlayer/metro');

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
