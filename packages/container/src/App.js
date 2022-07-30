import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
// Create a variable which value will be the result of calling of
// the lazy function
// MarketingLazy itself is a React Component, so we can choose to show
// that component only is some cases. And whenever we show it,
// this lazy thing is gonna go and try to import code related to
// file in path.
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

import Header from "./components/Header";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        {/*
          Fallback will be shown only when we are loading some code related
          to the MarketingApp or AuthApp
        */}
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </StylesProvider>
  );
}
