import React from "react";
import ReactDOM from "react-dom";
import "./css/nav.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { allReducers } from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
