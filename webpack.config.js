const
  path = require('path')
  , Webpack = require('webpack')
  , packageJson = require('./package.json')

  // webpack plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , TerserPlugin = require('terser-webpack-plugin')
  , {CleanWebpackPlugin} = require('clean-webpack-plugin')
  , CopyWebpackPlugin = require('copy-webpack-plugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')

  // config
  , terserConfig = require('@cycjimmy/config-lib/terserWebpackPlugin/2.x/production')
;

const
  libName = 'AwesomeSwiper'
  , IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PACK = process.env.NODE_ENV === 'pack'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
  , IS_STANDALONE = process.env.NODE_ENV === 'standalone'
  , cssIdentifier = IS_DEVELOPMENT ? '[path][name]__[local]' : '[hash:base64:10]'
;

const styleLoaderConfig = {
  styleLoader: {
    loader: 'style-loader',
    options: {injectType: 'singletonStyleTag'},
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: cssIdentifier,
      },
    },
  },
  cssLoaderNoModules: {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    },
  },
  postLoader: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve('postcss.config.js'),
      },
    },
  },
  sassLoader: {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        outputStyle: 'compressed',
      },
    },
  },
};

const OPTIMIZATION_OPTIONS = {
  minimize: true,
  minimizer: [new TerserPlugin(terserConfig)],
};


const config = {
  mode: 'none',
  entry: [
    'swiper',
    path.resolve('src', 'index.js')
  ],

  output: {
    library: libName,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('static'),
      path.resolve('node_modules')
    ],
    alias: {
      swiper: path.resolve('node_modules', 'swiper', 'dist', 'js', 'swiper.js')
    },
    extensions: ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        type: 'javascript/auto',
        loader: 'babel-loader',
      },

      // style
      {
        test: /\.css$/,
        use: [
          styleLoaderConfig.styleLoader,
          styleLoaderConfig.cssLoaderNoModules,
          styleLoaderConfig.postLoader,
        ],
      },
      {
        test: /\.scss$/,
        use: [
          styleLoaderConfig.styleLoader,
          styleLoaderConfig.cssLoader,
          styleLoaderConfig.postLoader,
          styleLoaderConfig.sassLoader,
        ],
      },

      // Pug template
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
      PACK: JSON.stringify(IS_PACK),
      PRODUCTION: JSON.stringify(IS_PRODUCTION),
      STANDALONE: JSON.stringify(IS_STANDALONE),
    }),

    new Webpack.BannerPlugin({
      banner: packageJson.name + ' v' + packageJson.version +
        '\nHomepage: ' + packageJson.homepage +
        '\nReleased under the ' + packageJson.license + ' License.'
    })
  ]
};

// dev mode
if (IS_DEVELOPMENT) {
  config.mode = 'development';

  // devtool
  config.devtool = 'source-map';

  config.output.path = path.resolve('dist');
  config.output.filename = libName + '.js';


  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
    }),

    new CopyWebpackPlugin([{
      from: path.resolve('static', 'images', '*'),
      to: path.resolve('dist'),
      flatten: true
    }]),

    new BrowserSyncPlugin({
      server: {
        baseDir: 'dist',
      },
    }, {
      reload: true,
    })
  );
}

// production mode
if (IS_PACK || IS_PRODUCTION) {
  config.output.path = path.resolve('build');

  config.externals = {
    swiper: 'Swiper'
  };

  if (IS_PACK) {
    config.output.filename = libName + '.js';

    config.plugins.push(
      new CleanWebpackPlugin({
        verbose: true,
        cleanStaleWebpackAssets: false,
      }),
    );
  }

  if (IS_PRODUCTION) {
    config.mode = 'production';

    config.output.filename = libName + '.min.js';

    config.plugins.push(
      new Webpack.HashedModuleIdsPlugin(),
    );

    config.optimization = OPTIMIZATION_OPTIONS;
  }
}

// standalone mode
if (IS_STANDALONE) {
  config.mode = 'production';

  config.output.path = path.resolve('standalone');
  config.output.filename = libName + '.standalone.min.js';

  config.plugins.push(
    new Webpack.HashedModuleIdsPlugin(),

    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CopyWebpackPlugin([{
      from: path.resolve('static', 'images', '*'),
      to: path.resolve('standalone'),
      flatten: true
    }]),
  );

  config.optimization = OPTIMIZATION_OPTIONS;
}

module.exports = config;
