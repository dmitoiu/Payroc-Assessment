import '../styles/globals.css'
import Layout from "../components/Layout";
import {useStore} from "../store";
import {Provider} from "react-redux";
import {useRouter} from "next/router";

function App({ Component, pageProps }) {
  let store = useStore();
  let location = useRouter();
  return (
      <Provider store={store}>
          <Layout>
              <Component {...pageProps}/>
          </Layout>
      </Provider>
  )
}

export default App;
