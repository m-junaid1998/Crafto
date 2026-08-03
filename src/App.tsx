import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routes";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainRouter />
    </BrowserRouter>
  );
};

export default App;
