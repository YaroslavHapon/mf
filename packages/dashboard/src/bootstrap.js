import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Mount function to start-up the app
// If we are in DEV mode and in isolation call mount immediately
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// Running the Marketing MF app in ISOLATION (Locally 8081)
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through the container
// and we should export the mount function
export { mount };
