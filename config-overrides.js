// config-overrides.js

module.exports = function override(config, env) {
    config.devServer = {
      ...config.devServer,
      setupMiddlewares: (middlewares, devServer) => {
        // Tambahkan middleware custom Anda di sini
        middlewares.push((req, res, next) => {
          console.log('Middleware berjalan!');
          next();
        });
        return middlewares;
      },
    };

    return config;
  };
