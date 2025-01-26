import { useState } from "react";
import "../css/CreatePageForm.css";
import { adminApi } from "../api/axios";
import EditorComponent from "./Editor";
import { defaultPageValues } from "../config/defaultPageValues";

// eslint-disable-next-line react/prop-types
const CreatePageForm = ({ addPage }) => {
  const [title, setTitle] = useState(defaultPageValues.title);
  const [metaDescription, setMetaDescription] = useState(
    defaultPageValues.metaDescription
  );
  const [content, setContent] = useState(defaultPageValues.content);
  const [urlSlug, setUrlSlug] = useState(defaultPageValues.urlSlug);

  const [titleError, setTitleError] = useState("");
  const [metaDescriptionError, setMetaDescriptionError] = useState("");
  const [contentError, setContentError] = useState("");
  const [urlSlugError, setUrlSlugError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    setTitleError("");
    setMetaDescriptionError("");
    setContentError("");
    setUrlSlugError("");

    try {
      const newPage = { title, metaDescription, content, urlSlug };
      const response = await adminApi.post("/pages", newPage);
      addPage(response.data.page);
      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.data.validationErrors) {
        const validationErrors = err.response.data.validationErrors;

        validationErrors.forEach((error) => {
          if (error.field === "title") setTitleError(error.message);
          if (error.field === "metaDescription")
            setMetaDescriptionError(error.message);
          if (error.field === "content") setContentError(error.message);
          if (error.field === "urlSlug") setUrlSlugError(error.message);
        });
      } else {
        setError("Failed to create page. Please try again.");
      }
    }
  };

  return (
    <div className="create-page-container">
      <h2>Create New Page</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {titleError && <p className="error-message">{titleError}</p>}
        </div>

        <div>
          <label>Meta Description:</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            required
          />
          {metaDescriptionError && (
            <p className="error-message">{metaDescriptionError}</p>
          )}
        </div>

        <div>
          <label>Content:</label>
          <EditorComponent content={content} setContent={setContent} />
          {contentError && <p className="error-message">{contentError}</p>}
        </div>

        <div className="url-slug-container">
          <label>URL Slug:</label>
          <input
            type="text"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
            required
          />
          {urlSlugError && <p className="error-message">{urlSlugError}</p>}
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">Page created successfully!</p>
        )}

        <button type="submit">Create Page</button>
      </form>
    </div>
  );
};

export default CreatePageForm;
