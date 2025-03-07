const { getDefaultConfig } = require('expo/metro-config');
const { configMetroIntlayer } = require('react-native-intlayer/metro');

const getConfig = async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return configMetroIntlayer(defaultConfig);
};

module.exports = (async () => await getConfig())();
