import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// Mount function to start-up the app
// If we are in DEV mode and in isolation call mount immediately
function mount(el, { onSignIn, onNavigate, defaultHistory, initialPath }) {
  // use defaultHistory or otherwise use createMemoryHistory
  // defaultHistory will only be provided if we use our app in isolation
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  // We can return a set of function that our Container can use
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
}

// Running the Marketing MF app in ISOLATION (Locally 8081)
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through the container
// and we should export the mount function
export { mount };
