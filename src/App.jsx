import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./Settings/palette.scss";
import "./Settings/reset.css";
import "./app.scss";
import AppRouter from "./Utils/AppRouter";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
