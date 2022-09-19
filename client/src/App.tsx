import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Register, Landing, Error, SharedLayout } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
