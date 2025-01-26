import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const EditorComponent = ({ content, setContent }) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_EDITOR_API_KEY}
      init={{
        plugins: [
          "autolink",
          "charmap",
          "emoticons",
          "link",
          "lists",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          "checklist",
          "mediaembed",
          "casechange",
          "export",
          "formatpainter",
          "tinymcespellchecker",
          "powerpaste",
          "advtable",
          "autocorrect",
          "typography",
          "inlinecss",
          "markdown",
          "importword",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
      }}
      value={content}
      onEditorChange={setContent}
    />
  );
};

EditorComponent.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default EditorComponent;
