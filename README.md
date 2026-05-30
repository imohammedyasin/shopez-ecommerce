# 🛍️ ShopEZ - Premium MERN E-Commerce Application

ShopEZ is a state-of-the-art full-stack e-commerce web application featuring a stunning, responsive front-end interface powered by **React** and a robust back-end server powered by **Node.js, Express, and MongoDB**.

This project has been fully configured as a unified monorepo, ready for high-performance single-service deployment on **Render** and serverless deployment on **Vercel**.

---

## 🎨 Core Features & Architecture

- **Sleek & Immersive UI/UX**: Built with modern typography, glassmorphism, hover indicators, and responsive grid layouts.
- **Dynamic Banners & Promos**: Instantly adjustable promotional banners from the admin dashboard.
- **Full Shopping Cart**: High-fidelity cart management with item increments, decrements, and automated price summaries.
- **Comprehensive Admin Panel**: Real-time sales statistics, charts, customer directory, product management, order processing, and dynamic hero banner administration.
- **Dedicated Customer Space**: Real-time purchase logs, profile customization, and self-service order cancellations.
- **Dynamic Relative Routing**: Reconfigured API pipelines from hardcoded ports to dynamic routing that auto-detects development vs. production environments.
- **Render Production Ready**: Configured for single-service monorepo hosting where the Express server serves the React production bundle.

---

## 🔑 Demo Credentials

To make exploration immediate, we have built two premium quick-login triggers into the **Login** screen:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin User** | `admin@shopez.com` | `admin123` | Control products, view all users, manage orders, update banners |
| **Customer User** | `john@example.com` | `customer123` | Browse products, search, add to cart, checkout, view profile |

---

## ⚙️ Environment Variables Setup

Create a `.env` file inside the `server/` directory and supply the following variables (you can also place them directly in your hosting dashboard environment keys):

```env
PORT=6001
JWT_SECRET=your_jwt_secret_key_here
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shop?retryWrites=true&w=majority
NODE_ENV=production
```

---

## 🚀 Local Installation & Running the App

### 1. Monorepo Installation (From Workspace Root)
Install all client and server dependencies with a single command:
```bash
npm run install-all
```

### 2. Database Seeding (Crucial First Step)
To populate your MongoDB database with premium product categories, products, customer accounts, and banner structures:
```bash
# Navigate to the server folder
cd server

# Run the seeding script
npm run seed
```

### 3. Running the Backend Server
```bash
# Inside the server directory
npm run dev
```
The server will boot up and bind to `http://localhost:6001/` by default.

### 4. Running the Frontend Client
```bash
# In a new terminal, navigate to the client folder
cd client

# Start the React dev server
npm start
```
The frontend client will start and open automatically on `http://localhost:3000/`. Thanks to our dynamic routing config, API calls are automatically forwarded from the client to the server on port `6001`!

---

## ☁️ Render Deployment (Single Web Service)

By serving the static frontend directly from the Node.js backend in production, you can deploy the **entire** MERN application as a **single Render Web Service** for free!

### Configuration Steps:
1. **Create a New Web Service** on Render and connect it to your GitHub repository.
2. Configure the following build settings in the Render Dashboard:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
3. Add the following **Environment Variables** in the Render Dashboard under **Environment**:
   - `PORT` = `6001`
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = `your_jwt_secret`
   - `MONGO_URI` = `your_mongodb_atlas_connection_string`

The script will automatically install both workspaces, build the static React bundle, and start Express to serve both the API endpoints and your frontend client.

---

## ⚡ Vercel Deployment (Frontend Only)

If you prefer to host your React client on **Vercel** for lightning-fast CDN delivery and keep the backend on **Render**:

1. **Deploy Backend to Render**: Deploy your backend first (as a Render Web Service). Take note of your backend URL (e.g. `https://shopez-api.onrender.com`).
2. **Deploy Frontend to Vercel**:
   - Create a new project on Vercel and connect your repository.
   - Set the **Root Directory** as `client`.
   - In the **Environment Variables** section on Vercel, add:
     - `REACT_APP_API_URL` = `https://shopez-api.onrender.com` (Your Render backend URL)
   - Click **Deploy**. Vercel will automatically compile your React client and direct all relative API requests directly to your backend!

---

## 🧪 Testing Suite

To run the React Testing Library suite validating your core state, navigation, and user authentication rendering:

```bash
# Navigate to client folder
cd client

# Run tests
npm test
```
