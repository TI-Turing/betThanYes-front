
// filepath: c:\Users\Usuario\TiTuring\betThanYes\app\config.ts
const ENV = {
  development: {
    API_BASE_URL: 'https://fn-app-betthanyes.azurewebsites.net/api',
  },
  production: {
    API_BASE_URL: 'https://api.example.com',
  },
  local: {
    API_BASE_URL: 'http://localhost:3000',
  },
};

const getEnvVars = () => {
  const env = process.env.NODE_ENV || 'development';
  return ENV[env];
};

export default getEnvVars();