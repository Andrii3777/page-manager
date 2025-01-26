import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../css/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Header
        rightButtons={[
          {
            label: "Login for Admin",
            onClick: handleAdminLogin,
          },
        ]}
      />
      <div className="home-page-container">
        <img
          src="/images/pageManager.png"
          alt="Page Manager"
          className="home-page-image"
        />
        <div className="home-page-text">Home Page</div>
      </div>
    </div>
  );
};

export default HomePage;
