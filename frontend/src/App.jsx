import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Link to="/login">
          Login
        </Link>

        <Link to="/signup">
          Signup
        </Link>
      </div>

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;