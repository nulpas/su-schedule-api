module.exports = {
  apps : [{
    name: 'vyz',
    script: './vyz.js',
    env: {
      NODE_ENV: 'development',
      JWT_SECRET: 4,
      SALT_ROUNDS: 'easyString'
    }
  }]
};
