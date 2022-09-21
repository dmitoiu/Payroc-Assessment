import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/index";
import Helmet from "react-helmet";
import {Navigate} from "react-router";
import {useStore} from "./store";
import {Provider} from "react-redux";
import "./styles/globals.css";
import NotFound from "./pages/404";
import Layout from "./components/Layout";

function App() {
    let store = useStore();
  return (
      <Provider store={store}>
          <Router>
              <Helmet>
                  <title>Darie-Dragoș Mitoiu</title>
              </Helmet>
              <Layout>
                  <main className={"h-[75vh]"}>
                      <Routes>
                          <Route path="/" element={<Home/>}/>
                          <Route path="*" element={<NotFound/>}/>
                      </Routes>
                  </main>
              </Layout>
          </Router>
      </Provider>
  );
}

export default App;
