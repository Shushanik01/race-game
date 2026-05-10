import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/index.ts';
import App from './App.tsx';
import { worker } from './mocks/browser.ts';

worker.start({
  serviceWorker: { url: `${process.env.PUBLIC_URL}/mockServiceWorker.js` },
  onUnhandledRequest: 'bypass',
}).then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
