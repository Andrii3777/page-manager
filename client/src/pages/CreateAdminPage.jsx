import { useState } from "react";
import Header from "../components/Header";
import { adminApi } from "../api/axios";
import "../css/FormStyles.css";

const CreateAdminPage = () => {
  const [email, setEmail] = useState("adminEmail2@example.com");
  const [password, setPassword] = useState("Db1234");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const newAdmin = { email, password };
      await adminApi.post("/create", newAdmin);
      setSuccess("Admin successfully created!");
    } catch (err) {
      console.error(err);
      setError("Failed to create admin. Please try again.");
    }
  };

  return (
    <div>
      <Header
        rightButtons={[
          {
            label: "Return to Page Manager page",
            onClick: () => (window.location.href = "/admin"),
          },
        ]}
      />
      <div className="form-container">
        <div className="form-box">
          <h2>Create New Admin</h2>

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
            {success && <p className="success-message">{success}</p>}

            <button type="submit" className="button">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminPage;
