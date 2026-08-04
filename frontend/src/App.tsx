import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routes";
import ScrollToTop from "./components/ScrollToTop";
import { ToastProvider } from "./components/ToastProvider";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainRouter />
      <ToastProvider />
    </BrowserRouter>
  );
};

export default App;
