function validateFields(title, metaDescription, content, urlSlug) {
  const errors = [];

  // Title validation
  if (!title || title.trim() === "") {
    errors.push({ field: "title", message: "Title is required" });
  } else if (title.length < 1 || title.length > 100) {
    errors.push({
      field: "title",
      message: "Title length must be between 1 and 100 characters",
    });
  }

  // Meta Description validation
  if (!metaDescription || metaDescription.trim() === "") {
    errors.push({
      field: "metaDescription",
      message: "Meta Description is required",
    });
  } else if (metaDescription.length < 10 || metaDescription.length > 300) {
    errors.push({
      field: "metaDescription",
      message: "Meta Description length must be between 10 and 300 characters",
    });
  }

  // Content validation
  if (!content || content.trim() === "") {
    errors.push({ field: "content", message: "Content is required" });
  } else if (content.length < 20 || content.length > 50000) {
    errors.push({
      field: "content",
      message: "Content length must be between 20 and 50000 characters",
    });
  } else if (/<script.*?>.*?<\/script>/gi.test(content)) {
    errors.push({
      field: "content",
      message: "Content contains malicious code",
    });
  }

  // URL Slug validation
  const reservedSlugs = ["home", "admin", "login"];
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!urlSlug || urlSlug.trim() === "") {
    errors.push({ field: "urlSlug", message: "URL Slug is required" });
  } else if (!slugRegex.test(urlSlug)) {
    errors.push({ field: "urlSlug", message: "URL Slug format is invalid" });
  } else if (reservedSlugs.includes(urlSlug.toLowerCase())) {
    errors.push({
      field: "urlSlug",
      message: `"${urlSlug}" is a reserved URL Slug and cannot be used`,
    });
  }

  // Return errors if any
  return errors.length > 0 ? errors : null;
}

module.exports = validateFields;
