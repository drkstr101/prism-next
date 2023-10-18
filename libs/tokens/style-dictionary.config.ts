import { camelCase, kebabCase } from 'lodash';
import { Config, TransformedToken } from 'style-dictionary';

const upperFirst = function (token: string): string {
  if (token) {
    return token.substring(0, 1).toUpperCase().concat(token.slice(1));
  } else {
    return '';
  }
};

const getTokenNameFromProperty = function (token: TransformedToken): string {
  if (token.attributes.category === 'size' && token.attributes.type === 'font') {
    return token.path.slice(2, token.path.length).join(' ').concat(' size');
  } else {
    return token.path.slice(1, token.path.length).join(' ');
  }
};

// If you need to add multiple configurations Config[] is supported
const config: Config | Config[] = {
  source: ['src/tokens/**/*.json'],
  transform: {
    'name/dsp/kebab': {
      type: 'name',
      transformer: (prop) => kebabCase(getTokenNameFromProperty(prop)),
    },
    'name/dsp/pascal': {
      type: 'name',
      transformer: (prop) => upperFirst(camelCase(getTokenNameFromProperty(prop))),
    },
  },
  transformGroup: {
    css: [
      'attribute/cti',
      'name/dsp/kebab', //replaces 'name/cti/kebab',
      'time/seconds',
      'content/icon',
      'size/rem',
      'color/css',
    ],
    scss: [
      'attribute/cti',
      'name/dsp/kebab', //replaces 'name/cti/kebab',
      'time/seconds',
      'content/icon',
      'size/rem',
      'color/css',
    ],
    js: [
      'attribute/cti',
      'name/dsp/pascal', //replaces 'name/cti/pascal',
      'size/rem',
      'color/hex',
    ],
  },
  platforms: {
    css: {
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
      transformGroup: 'css',
      buildPath: 'css/',
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    js: {
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
      transformGroup: 'js',
      buildPath: 'js/',
    },
  },
};

export default config;
