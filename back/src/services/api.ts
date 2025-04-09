const API_BASE_URL = "http://localhost:3000";

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  return response.json();
};

export const fetchBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/books`);
  return response.json();
};
