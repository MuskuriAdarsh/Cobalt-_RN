const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
  
const config = getDefaultConfig(__dirname);
  
module.exports = withNativeWind(config, { input: './global.css' });
// const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
  '@': './', // Alias for the project root
};

module.exports = defaultConfig;
