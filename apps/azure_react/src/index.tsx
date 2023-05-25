/* eslint-disable */

import React from 'react';
import {createRoot} from 'react-dom/client'
import App from './app';

export interface IAppConfig {
  props?: { [key: string]: any };
  shadowROOT?: boolean;
}

export const render = (el: HTMLElement, config: IAppConfig = {}) => {
  try {
    const { props = {}, shadowROOT } = config;

    const ROOT = el;

    if (!ROOT) {
      return;
    }

    const styleTags: any = window['customElStyles'] || [];

    if (shadowROOT) {
      ROOT.attachShadow({ mode: 'open' });
      const appRoot: any = document.createElement('div');
      createRoot(appRoot).render(<App {...props} />);
      ROOT.shadowRoot?.append(...styleTags, appRoot);
    } else {
      createRoot(ROOT).render(<App {...props} />);
      document.head.append(...styleTags);
    }

    delete window['customElStyles'];
  } catch (error) {
    console.error('CSR render error', error);
  }
};
