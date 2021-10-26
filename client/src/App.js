import { BrowserRouter, Route } from "react-router-dom";
import Tracker from "./pages/Tracker";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Tracker />
      </Route>
    </BrowserRouter>
  );
}

export default App;
