import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './Redux/store/store.ts';
import { Provider } from 'react-redux';
import UserProvider from './context/UserProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <UserProvider>
         <Provider store={store}>
            <ToastContainer />
            <App />
         </Provider>
      </UserProvider>
   </React.StrictMode>,
);
