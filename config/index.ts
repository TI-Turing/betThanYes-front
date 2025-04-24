// config/index.js
import Constants from 'expo-constants';

const extras = Constants.expoConfig!.extra as { environment?: string };
const ENV = extras.environment ?? 'development';

console.log('===== ENV CONFIG =====', ENV);

let config;
if (ENV === 'production') {
  config = require('../environment/production').default;
} else if (ENV === 'local') {
  config = require('../environment/local').default;
} else {
  config = require('../environment/development').default;
}

export default config;
