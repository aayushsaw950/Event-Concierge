AI Event Concierge

AI Event Concierge is a full-stack web application that helps users generate personalized event plans using AI. It suggests venues, locations, estimated costs, and reasons why the recommendation fits the user's needs.

Built with modern technologies like Next.js, MongoDB, and NextAuth, the app provides a seamless experience with authentication and user-specific event history.

---

##  Features

*  Google Authentication (NextAuth)
*  AI-powered event recommendations
*  Dynamic venue images (Pexels API)
*  User-specific event history
*  MongoDB database integration
*  Fast and responsive UI with animations
*  Toast notifications for better UX

---

## Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** MongoDB + Mongoose
* **Authentication:** NextAuth (Google Provider)
* **APIs:** Pexels API, AI generation service
* **Animations:** Framer Motion

---

##  Installation & Local Setup

### 1. Clone the repository


git clone https://github.com/your-username/Event-Concierge.git
cd Event-Concierge


---

### 2. Install dependencies


npm install


---

### 3. Setup environment variables

Create a `.env.local` file in the root directory and add:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# APIs
PEXELS_API_KEY=your_pexels_api_key
GROQ_API_KEY=your_ai_api_key
```

---

### 4. Run the development server

```bash
npm run dev
```

---

### 5. Open in browser

```
http://localhost:3000
```

---

## 🔑 Important Setup Notes

### Google Authentication

* Create OAuth credentials in Google Cloud Console
* Add this redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

---

### MongoDB

* Use MongoDB Atlas
* Whitelist IP: `0.0.0.0/0` (for development)

---

### Pexels API

* Get API key from Pexels
* Used for fetching event venue images

---

## Project Structure

```
/app
  /api
    /auth
    /events
    /generate
/components
/models
/lib
/services
```

---

##  Authentication Flow

* Users sign in via Google
* User is stored in MongoDB
* Events are linked using `userId`
* Only authenticated users can:

  * Generate events
  * View history

---

##  Future Improvements

*  Edit/Delete events
*  Dashboard analytics
*  Payment integration (SaaS model)
*  Search & filters
*  Mobile-first UI improvements

---

##  Author

**Aayush Kumar Saw**

---

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
