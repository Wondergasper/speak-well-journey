# Connecting the Flask Backend to the React Frontend

This guide explains how to connect your Speak Well Journey Flask backend to your React frontend for local development and production.

---

## Steps to Connect the Backend and Frontend

### 1. Start Both Servers

**Backend:**
1. Open a terminal and navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   python app.py
   ```
- The backend will run at `http://localhost:5000`.

**Frontend:**
1. Open a new terminal and navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
- The frontend will run at `http://localhost:8080`.

---

### 2. Configure the Frontend to Use the Backend API

1. In the `frontend` directory, create a file named `.env` (if it doesn't exist).
2. Add the following line to specify the backend API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. In your frontend code, use this environment variable for all API requests:
   ```ts
   const API_URL = import.meta.env.VITE_API_URL;
   ```

---

### 3. Update API Calls in the Frontend

- Replace any simulated or placeholder logic in your React components (e.g., `SignupPage.tsx`, `LoginPage.tsx`) with real API calls using `fetch` or `axios`:
  ```ts
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  ```

---

### 4. (Optional) Set Up a Proxy for Development

- To avoid CORS issues, you can add a proxy to your `vite.config.ts`:
  ```js
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  ```
- This will forward `/api` requests from the frontend to the backend during development.

---

### 5. Ensure CORS is Enabled in the Backend

- Your Flask backend should have CORS enabled (as described in your backend README).
- This allows the frontend to communicate with the backend without cross-origin issues.

---

### 6. Test the Connection

- Try registering or logging in from the frontend UI.
- Check the backend terminal/logs to confirm that requests are being received and processed.

---

### 7. Deploying

- For production, update the `VITE_API_URL` in your frontend `.env` to point to your deployed backend.
- Ensure both frontend and backend are accessible and CORS is properly configured.

---

## Summary

1. Start both servers.
2. Set the API URL in the frontend.
3. Update your API calls to use this URL.
4. (Optional) Set up a proxy.
5. Ensure CORS is enabled.
6. Test the integration.
7. Update for production as needed.

If you need code samples or more details for any step, see the project documentation or ask your team lead. 