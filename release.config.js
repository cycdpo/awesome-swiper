const makeCommonConfig = require('@cycjimmy/config-lib/semanticRelease/15.x/makeCommonConfig');

module.exports = makeCommonConfig({
  githubOptions: {
    "assets": [
      "build/AwesomeSwiper.min.js",
      "build/AwesomeSwiper.standalone.min.js",
    ]
  },
  exec: true,
  execOptions: {
    publishCmd: 'npm ci && npm run pack:all'
  }
});
