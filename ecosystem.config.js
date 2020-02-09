module.exports = {
  apps : [{
    name: 'vyz',
    script: './vyz.js',
    env: {
      NODE_ENV: 'development',
      JWT_SECRET: 'easyString',
      SALT_ROUNDS: 4
    }
  }]
};
