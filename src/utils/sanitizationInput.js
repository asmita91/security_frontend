const sanitizeInput = (input) => {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  const sanitizedText = doc.body.textContent || "";
  if (!sanitizedText) {
      throw new Error("Input cannot be empty or contain only HTML tags. Please write a proper comment.");
  }

  return sanitizedText;
};

export default sanitizeInput;
