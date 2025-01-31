import { useEffect, useState } from "react";
import { adminApi } from "../api/axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Page from "../components/Page";
import "../css/HomePage.css";

const HomePage = () => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await adminApi.get("/pages");
        setPages(response.data.pages);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pages.");
      }
    };

    fetchPages();
  }, []);

  return (
    <div>
      <Header
        rightButtons={[
          {
            label: "Login for Admin",
            onClick: () => navigate("/login"),
          },
        ]}
      />

      <div className="home-page-container">
        <div className="home-page-left">
          <img
            src="/images/pageManager.png"
            alt="Page Manager"
            className="home-page-image"
          />
          <div className="home-page-text">Home Page</div>
        </div>

        <div className="home-page-right">
          {error && <p className="home-page-error">{error}</p>}

          {pages.length === 0 ? (
            <p className="home-page-no-pages">No pages available.</p>
          ) : (
            <div>
              {pages.map((page) => (
                <Page
                  key={page.id}
                  id={page.id}
                  title={page.title}
                  metaDescription={page.metaDescription}
                  urlSlug={page.urlSlug}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
