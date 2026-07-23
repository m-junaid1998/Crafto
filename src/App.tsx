import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routes";


const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
};

export default App;