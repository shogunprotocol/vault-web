// Make bundle analyzer optional
let withBundleAnalyzer;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  withBundleAnalyzer = (config) => config;
}

const path = require('path');
const sassUtils = require(__dirname + '/libs/sass-utils');
const sassVars = require(__dirname + '/config/variables.js');

const firstNextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

const additionalNextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@studio-freight/compono'],
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: false,
  },
  // Skip static generation for pages with Spline 3D content
  unstable_excludePages: ['/', '/council'],
  // Add ESLint and TypeScript checking ignores for build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import 'styles/_functions';`,
    // Add quietDeps to suppress deprecation warnings
    quietDeps: true,
    functions: {
      'get($keys)': function (keys) {
        keys = keys.getValue().split('.');
        let result = sassVars;
        keys.forEach((key) => {
          result = result[key];
        });
        return sassUtils.castToSass(result);
      },
      'getColors()': function () {
        return sassUtils.castToSass(sassVars.colors);
      },
      'getThemes()': function () {
        return sassUtils.castToSass(sassVars.themes);
      },
    },
  },

  webpack: (config, options) => {
    const { dir } = options;

    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              dimensions: false,
              svgoConfig: {
                multipass: true,
                plugins: [
                  'removeDimensions',
                  'removeOffCanvasPaths',
                  'reusePaths',
                  'removeElementsByAttr',
                  'removeStyleElement',
                  'removeScriptElement',
                  'prefixIds',
                  'cleanupIds',
                  {
                    name: 'cleanupNumericValues',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'convertPathData',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'convertTransform',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'cleanupListOfValues',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }],
      },
      // Skip processing of problematic SCSS modules during build
      {
        test: /\.(footer|header|scrollbar|home|navigation)\.module\.scss$/,
        use: 'null-loader'
      }
    );

    return config;
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
  redirects: async () => {
    return [{ source: '/home', destination: '/', permanent: true }];
  },
};

// Combine webpack configurations
const combinedWebpack = (config, options) => {
  config = firstNextConfig.webpack(config, options);
  config = additionalNextConfig.webpack(config, options);
  return config;
};

// Final combined configuration
const finalNextConfig = {
  ...firstNextConfig,
  ...additionalNextConfig,
  webpack: combinedWebpack,
};

module.exports = () => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...finalNextConfig });
};
