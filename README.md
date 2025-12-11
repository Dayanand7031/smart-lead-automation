# Smart Lead Automation System (MERN Stack)

A full-stack lead enrichment and automation system that processes batches of names, predicts nationality using an external API, applies business rules, stores results, and runs scheduled background jobs to sync verified leads.

This project demonstrates:

- API Integration  
- Asynchronous Processing  
- Cron-based Automation  
- MongoDB Persistence  
- Full MERN Stack Architecture  
- Clean React Dashboard with Tailwind CSS 

## Live Demo Links
# Component	URL
- Frontend	https://smart-lead-automation-three.vercel.app/
- Backend API https://smart-lead-backend-bzn3.onrender.com/api/leads/health or https://smart-lead-backend-bzn3.onrender.com/test
- GitHub Repo	https://github.com/Dayanand7031/smart-lead-automation)

## Tech Stack
- Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

## Backend
- Node.js (Express)
- MongoDB + Mongoose
- Axios
- Node-cron
- dotenv
- CORS

## Features

### Batch Input  
Users can submit a list of names separated by commas.

###  API Enrichment  
Fetches nationality predictions using:  
-- https://api.nationalize.io?name=
<NAME>



###  Business Rules  
```text
If probability >= 0.6 → Status = Verified  
Else → Status = To Check
```


## Database Storage

# Each lead contains:
- name
- country
- probability
- status
- synced (boolean)
- syncedAt (timestamp)

## Dashboard
- Live data refresh
- Filtering (All / Verified / To Check)
- Clean Tailwind UI

## Automation (Cron Job)
# A background job runs every 5 minutes:
- Finds one verified & unsynced lead
- Marks it as synced
- Logs the action:
-- [CRM Sync] Sending <name> to Sales Team...

## Project Structure

full-stack-assignment/
│
├── backend/
│   ├── controllers/
│   │   └── leadController.js
│   ├── models/
│   │   └── Lead.js
│   ├── routes/
│   │   └── leadRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── index.css
    ├── public/
    ├── vite.config.js
    └── .env


## Setup Instructions
# Backend Setup
- cd backend
- npm install
- Create .env:

#  MONGO_URI=your_mongodb_connection_string(previously local string / when deploying use cloud atlas string)
PORT=5000


## Start server:
# npm run dev

## Frontend Setup
- cd frontend
- npm install
- Create .env:
- VITE_API_BASE=http://localhost:5000


Start frontend:

npm run dev


## Architecture Explanation
# Batch Request Handling
# Backend processes batches efficiently:

- Splits names into an array
- Calls Nationalize API for each
- Applies business rules
- Saves results to MongoDB
- Returns processed output
- 
## Business Logic
if (probability >= 0.6)
    status = "Verified";
else
    status = "To Check";

## Database Storage

# Mongoose schema stores:

- name
- country
- probability
- status
- synced
- syncedAt

# Automation & Idempotency

Every 5 minutes:
nodeCron.schedule("*/5 * * * *", async () => {
  const lead = await Lead.findOneAndUpdate(
    { status: "Verified", synced: false },
    { $set: { synced: true, syncedAt: new Date() } },
    { new: true }
  );
});



Database Screenshot

<img width="1897" height="765" alt="image" src="https://github.com/user-attachments/assets/a77977c3-cc36-4db6-8d8a-fad284f03480" />

