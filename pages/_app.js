import "../styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Layout from "../components/Layout/Layout";
import { MyContext } from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <MyContext.Provider value={{ greeting: "Hello" }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MyContext.Provider>
  );
}

export default MyApp;
