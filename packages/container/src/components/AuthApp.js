import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ setIsSignedIn }) => {
  // useRef returns a mutable ref object whose .current property is initialized
  // to the passed argument (initialValue).
  // The returned object will persist for the full lifetime of the component.
  // It’s handy for keeping any mutable value around similar
  // to how you’d use instance fields in classes.
  const ref = useRef(null);
  // Provides access to actual BH object, copy of BH that used in Container
  const history = useHistory();

  useEffect(() => {
    // When our components pass the reference to HTMLElement to our mount function
    // if (ref.current === null) {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate({ pathname: nextPathname }) {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn() {
        setIsSignedIn(true);
        console.log("Signed in detect!");
      },
    });

    history.listen(onParentNavigate);
  }, []);

  // Create reference to the HTMLElement
  return <div ref={ref} />;
};

// When our component mount we receive the ref to div HTMLElement
// And then pass that reference to element inside our mount function
// and render out app inside that div
