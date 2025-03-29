import { Config } from '@stencil/core';
import { postcss } from "@stencil-community/postcss";
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'dovetail-podcasts-player-web-components',
  buildDist: true,
  outputTargets: [
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../blocks/src/components/stencil-generated/'
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    postcss()
  ],
  testing: {
    browserHeadless: "shell",
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
  },
  devServer: {
    reloadStrategy: 'pageReload'
  }
};
