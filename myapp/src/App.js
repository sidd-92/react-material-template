import React, { Suspense } from "react";
import "./App.css";
import NavbarPage from "./containers/Header";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

function App() {
  return (
    <Router basename="/">
      <React.Suspense fallback={<SpinnerPage />}>
        <Switch>
          <Route
            path="/"
            name="Home"
            render={(props) => <DefaultLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
