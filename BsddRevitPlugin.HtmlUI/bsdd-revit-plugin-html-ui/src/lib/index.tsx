import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../authConfig';

import BsddSearch from './BsddSearch';

export const msalInstance = new PublicClientApplication(msalConfig);

export function insertBsddSearch(domElement: HTMLElement, callback: any, config: any) {
  const root = ReactDOM.createRoot(domElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <BsddSearch callback={callback} config={config} msalInstance={msalInstance} />
    </React.StrictMode>,
  );
}

export default BsddSearch;
