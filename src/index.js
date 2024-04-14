import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { worker } from './app/mock'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';

// Start our mock API server
if ( process.env.NODE_ENV == 'development') {
  await worker.start({onUnhandledRequest: 'bypass'})
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
