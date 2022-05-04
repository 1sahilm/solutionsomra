import "../styles/globals.scss";
import "../styles/home.css";
import "../styles/Home.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "next-auth/client";
import Layout from "../components/Layout";
import { store } from "../state/store";
import { Provider as ReactRedux } from "react-redux";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(pageProps.session);
  
  return (

    <Provider session={session}>
      <ReactRedux store={store}>
       
        
          <Component {...pageProps} updateSession={setSession} />
        
      </ReactRedux>
    </Provider>
  )
  
}

export default MyApp;
