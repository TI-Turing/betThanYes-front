// app.config.js
import 'dotenv/config';

export default ({ config }) => {
  // Leer ENV desde los scripts de package.json
  const env = process.env.ENV ?? 'development';

  return {
    ...config,
    extra: {
      ...config.extra,
      environment: env,
    },
  };
};
