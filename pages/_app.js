import TanstackQueryProvider from "../providers/TanstackQueryProvider"

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <TanstackQueryProvider>
      <Component {...pageProps} />
    </TanstackQueryProvider>
  );
}

export default MyApp;
