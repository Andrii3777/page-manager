import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import CreatePageForm from "../components/CreatePageForm";
import Page from "../components/Page";
import Header from "../components/Header";
import "../css/PageManagerPage.css";

const PageManagerPage = () => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await api.get("/pages");
        setPages(response.data.pages);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pages.");
      }
    };

    fetchPages();
  }, []);

  const handleDeletePage = (id) => {
    setPages((prevPages) => prevPages.filter((page) => page.id !== id));
  };

  const addPage = (newPage) => {
    setPages((prevPages) => [...prevPages, newPage]);
  };

  const handleLogout = async () => {
    try {
      await api.get("/logout");
      localStorage.removeItem("accessToken");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Logout failed.");
    }
  };

  const handleCreateAdmin = () => {
    navigate("/admin/create-admin");
  };

  return (
    <div className="page-manager">
      <Header
        rightButtons={[
          {
            label: "Create New Admin",
            onClick: handleCreateAdmin,
          },
          {
            label: "Logout",
            onClick: handleLogout,
          },
        ]}
      />

      <div className="page-manager-container">
        <div className="page-manager-left">
          <h2>Created Pages</h2>
          {error && <p className="page-manager-error">{error}</p>}

          {pages.length === 0 ? (
            <p className="page-manager-no-pages">No pages available.</p>
          ) : (
            <div>
              {pages.map((page) => (
                <Page
                  key={page.id}
                  id={page.id}
                  title={page.title}
                  metaDescription={page.metaDescription}
                  urlSlug={page.urlSlug}
                  onDelete={handleDeletePage}
                />
              ))}
            </div>
          )}
        </div>

        <div className="page-manager-right">
          <CreatePageForm addPage={addPage} />
        </div>
      </div>
    </div>
  );
};

export default PageManagerPage;
