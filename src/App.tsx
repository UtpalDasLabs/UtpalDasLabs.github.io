import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
