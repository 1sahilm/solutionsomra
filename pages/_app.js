import '../styles/globals.scss';
import '../styles/home.css';
import '../styles/Home.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

import { Provider } from 'next-auth/client';
import { Provider as ReactRedux } from 'react-redux';

import { store } from '../state/store';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(pageProps.session);

  return (
    <Provider session={session}>
      <ReactRedux store={store}>
        <Component {...pageProps} updateSession={setSession} />
      </ReactRedux>
    </Provider>
  );
}

export default MyApp;
