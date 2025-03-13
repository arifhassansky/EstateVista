# Real Estate Platform 

# EstateVista

## Admin Credentials  
- **Username:** jahnkarmahbub@gmail.com
- **Password:**  All@123456

## Live Site  
[EstateVista](https://estatevista-7e230.web.app/)  

## Features  
- 🏡 Users can wishlist & purchase properties  
- ⭐ Users can add reviews for properties  
- 👩‍💼 Agents can add and manage their properties  
- ✅ Admin can verify/reject properties & manage users  
- 🔐 Secure Authentication (Firebase & JWT)  
- 📍 Search properties by location  
- 💰 Sort properties by price range  
- 🎨 Fully responsive for mobile, tablet, and desktop  
- 🚀 Persistent login on private routes  
- 🔔 toast notifications for all actions  

## Technologies Used

- React (Vite) + Tailwind CSS
- Node.js + Express.js
- MongoDB
- Firebase Authentication
- TanStack Query + Axios
- toast for notifications

## 💻 Local Setup Guide

Follow these steps to run the project locally:

### 1. Clone the repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/ayeshaferdous/estatevista.git
cd estatevista
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up environment variables

To configure the backend services like Firebase and MongoDB, you'll need to set up environment variables. Create a .env file in the root of the project and add the following:

```bash
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

Make sure to replace your-* with actual credentials from your Firebase project.

### 4. Run the project

Once the dependencies are installed and environment variables are configured, you can run the project locally using:

```bash
npm start
```

This will start the development server and open the project in your default browser. You can now begin working with the Roomify Platform locally.

## 🔧 Backend Setup (Optional)

If you want to set up the backend locally for testing purposes:

1. Navigate to the server directory (if applicable).
2. Install backend dependencies:

```bash
npm install
```

3. Create a .env file in the backend directory with the following credentials:

```bash
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
```

4. Start the backend server:

```bash
npm run dev
```

Your backend will now be running, and you can test the API along with the frontend.
