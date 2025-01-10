import ReactDOM from "react-dom/client";
import App from "./ui/app/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { setupStore } from "./state/store";
import { BrowserRouter } from "react-router-dom";
import DarkThemeProvider from "./ui/theme/theme_provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={setupStore()}>
    <BrowserRouter>
      <DarkThemeProvider>
        <App />
      </DarkThemeProvider>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
