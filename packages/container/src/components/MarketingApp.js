import { mount } from "marketing/MarketingIndex";
import React, { useRef, useEffect } from "react";

export default () => {
  // useRef returns a mutable ref object whose .current property is initialized
  // to the passed argument (initialValue).
  // The returned object will persist for the full lifetime of the component.
  // It’s handy for keeping any mutable value around similar
  // to how you’d use instance fields in classes.
  const ref = useRef(null);

  useEffect(() => {
    // When our components pass the reference to HTMLElement to our mount
    // function
    mount(ref.current);
  }, []);

  // Create reference to the HTMLElement
  return <div ref={ref} />;
};

// When our component mount we receive the ref to div HTMLElement
// And then pass that reference to element inside our mount function
// and render out app inside that div
