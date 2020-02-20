import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

import { Navbar } from './components';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div>
          <Navbar />
          <Routes />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
