import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import MainRouter from "./Routes";
import ScrollToTop from "./components/ScrollToTop";
import { ToastProvider } from "./components/ToastProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop />
            <ToastProvider />
            <MainRouter />
          </BrowserRouter>
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
