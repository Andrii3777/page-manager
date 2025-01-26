import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import Header from "../components/Header";
import "../css/FormStyles.css";

const AdminLoginPage = () => {
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL);
  const [password, setPassword] = useState(import.meta.env.VITE_ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div>
      <Header
        rightButtons={[
          { label: "Return to Home", onClick: handleReturnToHome },
        ]}
      />
      <div className="form-container">
        <div className="form-box">
          <h2>Login for Admin</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
