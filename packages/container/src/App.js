import React, { lazy, Suspense, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

import Header from "./components/Header";
import Progress from "./components/Progress";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            </Route>
            <ProtectedRoute path="/dashboard" isSignedIn={isSignedIn}>
              <DashboardLazy />
            </ProtectedRoute>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </Router>
    </StylesProvider>
  );
}
