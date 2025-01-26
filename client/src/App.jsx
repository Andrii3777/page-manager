import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import PageManagerPage from "./pages/PageManagerPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import PageViewer from "./pages/PageViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/:urlSlug" element={<PageViewer />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<PageManagerPage />} />
          <Route path="/admin/create-admin" element={<CreateAdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
