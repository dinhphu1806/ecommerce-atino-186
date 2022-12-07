import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//12
import { ToastContainer } from 'react-toastify';
// 13
import 'react-toastify/dist/ReactToastify.css';

// từ file store
import store from './redux/store';
/// setting npm install react-redux
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>   {/*// connect reacr-redux provider làm cho store có thể truy cập đến component, vì vậy toàn toàn bộ app đều access được đến store */}
          <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={500}
            closeOnClick
            pauseOnHover={false}
          />    
          {/* // xong import Toast tren */}
            {/* Same as */}
          <ToastContainer />
          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);




