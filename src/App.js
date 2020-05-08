import React from "react";
import { Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import TopBar from "./TopBar";
import ImageSearchPage from "./ImageSearchPage";
import "./App.css";
const history = createHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />
        <Route path="/imagesearch" exact component={ImageSearchPage} />
      </Router>
    </div>
  );
}
export default App;