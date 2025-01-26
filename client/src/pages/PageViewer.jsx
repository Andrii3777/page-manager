import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import Header from "../components/Header";

const PageViewer = () => {
  const { urlSlug } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPageBySlug = async () => {
      try {
        const response = await api.get(`pages/${urlSlug}`);
        setPage(response.data.page);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch page.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageBySlug();
  }, [urlSlug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!page) return <p>Page not found</p>;

  return (
    <div>
      <Header
        rightButtons={[
          {
            label: "Back",
            onClick: () => navigate(-1),
          },
        ]}
      />
      <div
        style={{ padding: "50px" }}
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
};

export default PageViewer;
