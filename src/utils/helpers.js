// Format date in readable form
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

// Calculate average rating from array of ratings
export const averageRating = (ratings = []) => {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return (sum / ratings.length).toFixed(1);
};

// Convert comma-separated tags to array
export function parseTags(tagsString) {
  if (typeof tagsString !== "string") return [];
  return tagsString.split(",").map((tag) => tag.trim());
}

// Capitalize first letter of a string
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
