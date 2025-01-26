import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/axios";
import "../css/Page.css";

// eslint-disable-next-line react/prop-types
const Page = ({ id, title, metaDescription, urlSlug, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${urlSlug}`);
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete the page "${title}"?`)
    ) {
      try {
        await adminApi.delete(`/pages/${id}`);
        onDelete(id);
      } catch (err) {
        console.error("Failed to delete page:", err);
        alert("Failed to delete page. Please try again.");
      }
    }
  };

  return (
    <div className="page-container">
      <div onClick={handleClick} className="page-content">
        <h3>{title}</h3>
        <p>{metaDescription}</p>
      </div>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default Page;
