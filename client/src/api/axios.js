import axios from "axios";

let isRefreshing = false; // Flag to prevent multiple token refresh requests
let failedQueue = []; // Queue to store requests awaiting token refresh

// Process queued requests after the token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token);
  });
  failedQueue = []; // Clear the queue
};

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/admin",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add Authorization header for each request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Intercept response errors to handle token expiration
adminApi.interceptors.response.use(
  (response) => response, // Return successful responses as is
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and the request hasn't been retried yet
    if (shouldRetry(error, originalRequest)) {
      if (isRefreshing) {
        // If a refresh is in progress, queue the request
        return queueRequest(originalRequest);
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the access token
        const newToken = await refreshAccessToken();
        processQueue(null, newToken); // Resolve all queued requests

        // Retry the original request with the new token
        return retryRequest(originalRequest, newToken);
      } catch (refreshError) {
        processQueue(refreshError, null); // Reject all queued requests on error
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // Reset the refreshing flag
      }
    }

    // If error isn't related to 401, reject the error
    return Promise.reject(error);
  }
);

// Helper functions

// Check if the request should be retried (401 Unauthorized and no retry yet)
const shouldRetry = (error, originalRequest) =>
  error.response?.status === 401 && !originalRequest._retry;

// Queue the request if token refresh is in progress
const queueRequest = (originalRequest) =>
  new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject }); // Add request to the queue
  }).then((token) => retryRequest(originalRequest, token));

// Refresh the access token
const refreshAccessToken = async () => {
  const response = await api.get("/refresh");
  const { accessToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  adminApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return accessToken;
};

// Retry the original request with the new access token
const retryRequest = (originalRequest, token) => {
  originalRequest._retry = true;
  originalRequest.headers["Authorization"] = `Bearer ${token}`;
  return axios(originalRequest);
};

export { adminApi, api };
