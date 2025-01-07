import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home"; // Import the new Home component
import Login from "./Login";
import Register from "./Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* Add route for Home */}
      </Routes>
    </Router>
  );
}

export default App;
