# Email Flow Builder

A full-stack web application allowing users to visually design and implement email marketing sequences using a drag-and-drop flowchart interface. The application saves the flow structure and automatically schedules and sends emails based on the sequence and defined delays.

## Features

*   **Visual Flowchart Interface:** Build email sequences using a drag-and-drop interface powered by React Flow.
*   **Node Types:** Includes core nodes for building sequences:
    *   `Lead Source`: Represents the starting point of a flow (e.g., a new lead entering the system).
    *   `Cold Email`: Configurable node to send an email with specified recipient, subject, and body.
    *   `Wait/Delay`: Configurable node to pause the sequence for a specified duration.
*   **Node Configuration:** Edit properties directly within nodes (e.g., email content, delay duration).
*   **Connect Nodes:** Draw edges to define the flow path.
*   **Save & Load Flows:** Save the current flowchart structure to the database and load the most recently saved flow for the logged-in user.
*   **Automated Scheduling:** The backend processes the saved flow and uses Agenda to schedule email sending jobs based on the sequence and Wait node durations.
*   **Email Sending:** Emails are sent reliably using Nodemailer.
*   **User Authentication:** Secure user accounts with registration and login to manage personal flows (implemented with JWT and BCrypt).

## Tech Stack

*   **Frontend:**
    *   React
    *   React Flow: For the visual flowchart interface.
    *   Zustand: Simple state management for authentication.
    *   React Router DOM: For navigation and protected routes.
    *   Axios: For making API requests to the backend.
    *   HTML/CSS
*   **Backend:**
    *   Node.js
    *   Express.js: Web framework for building the API.
    *   MongoDB: NoSQL database for storing user accounts and flow structures.
    *   Mongoose: ODM for interacting with MongoDB.
    *   Agenda: A job scheduling library for Node.js, backed by MongoDB, used for scheduling email sending.
    *   Nodemailer: Library for sending emails.
    *   JWT (jsonwebtoken): For creating and verifying authentication tokens.
    *   BCrypt: For hashing passwords.
    *   CORS: Middleware to enable cross-origin requests from the frontend.
    *   Dotenv: For loading environment variables from a `.env` file.

## Folder Structure

email-flow-builder/
├── backend/
│ ├── src/
│ │ ├── api/ # Express routers (auth, flows)
│ │ ├── config/ # Configuration loading (.env)
│ │ ├── jobs/ # Agenda job definitions (email sending)
│ │ ├── middleware/ # Express middleware (auth)
│ │ ├── models/ # Mongoose schemas (user, flow)
│ │ ├── services/ # Core business logic (auth, email, flow, agenda)
│ │ ├── server.js # Backend entry point
│ │ └── ...
│ ├── .env.example # Example env file (DON'T COMMIT YOUR REAL .env)
│ ├── .gitignore
│ ├── package.json
│ └── ...
└── frontend/
├── public/
├── src/
│ ├── api/ # Axios instance with interceptors
│ ├── components/ # React components (FlowBuilder, Auth, Nodes, Palette)
│ │ ├── Auth/
│ │ └── CustomNodes/
│ ├── hooks/ # Custom hooks (useAuth)
│ │ └── useAuth.js
│ ├── config.js # Frontend configuration
│ ├── App.js # Main App component with routing
│ ├── index.js # React entry point
│ ├── index.css # Basic styling
│ └── ...
├── .env.example # Example env file (DON'T COMMIT YOUR REAL .env)
├── .gitignore
├── package.json
└── ...
## Setup Instructions

### Prerequisites

*   Node.js and npm installed on your machine.
*   Git installed on your machine.
*   A running MongoDB instance. This can be:
    *   Local MongoDB (Community Server).
    *   A cloud-hosted MongoDB service (like MongoDB Atlas - Recommended for production/demo deployment).
*   An email account for sending emails (or use a service like Ethereal for testing).

### 1. Clone the Repository

Open your terminal and clone the project:

### git clone <repository_url> # Replace with your GitHub repo URL
### cd email-flow-builder

2. Backend Setup
Navigate into the backend directory:
### cd backend

Install backend dependencies:
### npm install

Create a .env file in the backend directory. You can copy the .env.example file and rename it.
### cp .env.example .env # On macOS/Linux
# or
### copy .env.example .env # On Windows

### Edit the .env file with your configuration:
PORT=5000 # Or any port you prefer
MONGODB_URI=your_mongodb_connection_string # See below for details
EMAIL_USER=your_sending_email@example.com
EMAIL_PASS=your_email_password # Or App Password (see below)
EMAIL_HOST=smtp.gmail.com # Your SMTP server host
EMAIL_PORT=587 # Your SMTP server port (e.g., 587 for TLS, 465 for SSL)
EMAIL_SECURE=false # true for SSL (port 465), false for TLS (port 587) - Enter as "true" or "false" string
JWT_SECRET=your_super_secret_random_jwt_key # Generate a long, random string


### 3. Frontend Setup
Navigate into the frontend directory from the project root:
### cd ../frontend # Assuming you are in the backend dir, go up one level and into frontend
# or
### cd path/to/your/email-flow-builder/frontend # From anywhere

Install frontend dependencies:
### npm install

Create a .env file in the frontend directory:
### cp .env.example .env # On macOS/Linux
# or
### copy .env.example .env # On Windows

Edit the .env file:
### REACT_APP_API_BASE_URL=http://localhost:5000/api # Or your live backend URL + /api

#### 4. Running Locally
Start MongoDB: Ensure your local MongoDB server is running, or that your MongoDB Atlas cluster is accessible.
Start Backend:
### cd backend
### npm run dev # Uses nodemon to watch for changes

Check the backend console for "MongoDB connected" and "Agenda initialized and started".
Start Frontend:
### cd ../frontend # Navigate back to frontend
### npm start

The frontend application should open in your browser, usually at http://localhost:3000.

### Usage
Open the frontend application in your browser (either http://localhost:3000 for local, or your Vercel deployment URL).
If you don't have an account, click the "Register" link and create one.
Click the "Login" link and log in with your credentials. You will be redirected to the flow builder.

### Build Your Flow:
Drag "Lead Source", "Cold Email", and "Wait/Delay" nodes from the "Node Palette" sidebar onto the canvas.
Connect nodes by dragging from a source handle (bottom) to a target handle (top).

### Click on nodes to configure them:

Cold Email: Enter the recipient email address (use your test/Ethereal email!), subject, and body.
Wait/Delay: Enter the duration (currently configured for minutes for easier demo; check frontend/src/components/CustomNodes/WaitNode.js for the current unit).
Ensure your flow starts with a "Lead Source" node and proceeds through Wait/Delay nodes to Cold Email nodes.
Click the "Save Flow" button. You should see a success alert.
Verify Scheduling: If running locally, check your backend console. If using Render, check the logs on your Render dashboard for the backend service. You should see logs indicating that the flow was processed and email jobs were scheduled by Agenda for the future time(s).
Wait for the delay period(s) you set in the "Wait/Delay" nodes.
Check the inbox of the recipient email address you entered in the "Cold Email" node. You should receive the email(s) sent by your application.
Click the "Load Flow" button to retrieve and display the most recently saved flow.

### Author
AADITYA
