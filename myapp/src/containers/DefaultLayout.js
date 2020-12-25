import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import routes from "../routes";
const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <main className="pt-5 mt-4 mx-2">
          <Suspense fallback={<SpinnerPage />}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <route.component {...props} routes={route.routes} />
                    )}
                  />
                ) : null;
              })}
              <Redirect from="/" to="/" />
            </Switch>
          </Suspense>
        </main>
      </div>
    );
  }
}

export default DefaultLayout;
