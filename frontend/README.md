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
Use code with caution.
Markdown
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

```bash
git clone <repository_url> # Replace with your GitHub repo URL
cd email-flow-builder
Use code with caution.
2. Backend Setup
Navigate into the backend directory:
cd backend
Use code with caution.
Bash
Install backend dependencies:
npm install
Use code with caution.
Bash
Create a .env file in the backend directory. You can copy the .env.example file and rename it.
cp .env.example .env # On macOS/Linux
# or
copy .env.example .env # On Windows
Use code with caution.
Bash
Edit the .env file with your configuration:
PORT=5000 # Or any port you prefer
MONGODB_URI=your_mongodb_connection_string # See below for details
EMAIL_USER=your_sending_email@example.com
EMAIL_PASS=your_email_password # Or App Password (see below)
EMAIL_HOST=smtp.gmail.com # Your SMTP server host
EMAIL_PORT=587 # Your SMTP server port (e.g., 587 for TLS, 465 for SSL)
EMAIL_SECURE=false # true for SSL (port 465), false for TLS (port 587) - Enter as "true" or "false" string
JWT_SECRET=your_super_secret_random_jwt_key # Generate a long, random string
Use code with caution.
Env
MONGODB_URI:
Local: mongodb://localhost:27017/emailflow (if running locally on default port without auth). Use mongodb://username:password@localhost:27017/emailflow if authentication is enabled.
MongoDB Atlas: Get the connection string from your Atlas cluster dashboard (replace <username> and <password> with your DB user credentials).
EMAIL_USER / EMAIL_PASS:
Use credentials for an email account that can send emails.
For Gmail/Outlook with 2FA: You likely need to generate an App Password through your email account's security settings. Using your main account password with 2FA enabled will fail.
For Testing (Recommended): Use Ethereal Email. It provides temporary SMTP credentials and an inbox viewer instantly. Update EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT, and EMAIL_SECURE with the Ethereal details.
JWT_SECRET: Generate a strong, random string. You can use online generators or tools like node -e "console.log(require('crypto').randomBytes(32).toString('hex'))".
3. Frontend Setup
Navigate into the frontend directory from the project root:
cd ../frontend # Assuming you are in the backend dir, go up one level and into frontend
# or
cd path/to/your/email-flow-builder/frontend # From anywhere
Use code with caution.
Bash
Install frontend dependencies:
npm install
Use code with caution.
Bash
Create a .env file in the frontend directory:
cp .env.example .env # On macOS/Linux
# or
copy .env.example .env # On Windows
Use code with caution.
Bash
Edit the .env file:
REACT_APP_API_BASE_URL=http://localhost:5000/api # Or your live backend URL + /api
Use code with caution.
Env
Set REACT_APP_API_BASE_URL to the URL where your backend will be accessible. For local development, this is typically http://localhost:5000/api (or whatever port you chose for the backend). If deploying, this will be the public URL of your backend service (e.g., https://your-render-service.onrender.com/api).
4. Running Locally
Start MongoDB: Ensure your local MongoDB server is running, or that your MongoDB Atlas cluster is accessible.
Start Backend:
cd backend
npm run dev # Uses nodemon to watch for changes
Use code with caution.
Bash
Check the backend console for "MongoDB connected" and "Agenda initialized and started".
Start Frontend:
cd ../frontend # Navigate back to frontend
npm start
Use code with caution.
Bash
The frontend application should open in your browser, usually at http://localhost:3000.
5. Deployment (Vercel for Frontend, Render for Backend)
This project is structured for separate deployments.
Set up MongoDB Atlas: If you haven't already, follow Step 1 from the "Deployment Strategy" in the previous response to set up a cloud database and get your MONGODB_URI.
Deploy Backend to Render:
Go to render.com and connect your GitHub.
Create a New Web Service.
Link your email-flow-builder GitHub repository.
Set the Root Directory to backend/.
Choose Node environment.
Set Build Command to npm install.
Set Start Command to node src/server.js.
Add Environment Variables matching the names from your backend/.env (e.g., MONGODB_URI, EMAIL_USER, JWT_SECRET, etc.) using your live credentials/secrets and the Atlas URI.
Select the "Free" instance type.
Create the service. Render will provide a public URL once deployed (e.g., https://your-backend-name.onrender.com). Note this URL.
Note: Agenda jobs on Render's free tier stop when the service sleeps. For reliable long delays, a paid plan or a dedicated worker service would be needed.
Deploy Frontend to Vercel:
Go to vercel.com and connect your GitHub.
Create a New Project.
Link your email-flow-builder GitHub repository.
Set the Root Directory to frontend/.
Vercel should auto-detect "Create React App".
Add an Environment Variable:
Name: REACT_APP_API_BASE_URL
Value: The public URL of your Render backend service plus /api (e.g., https://your-backend-name.onrender.com/api).
Deploy the project. Vercel will provide a public URL once deployed.
Usage
Open the frontend application in your browser (either http://localhost:3000 for local, or your Vercel deployment URL).
If you don't have an account, click the "Register" link and create one.
Click the "Login" link and log in with your credentials. You will be redirected to the flow builder.
Build Your Flow:
Drag "Lead Source", "Cold Email", and "Wait/Delay" nodes from the "Node Palette" sidebar onto the canvas.
Connect nodes by dragging from a source handle (bottom) to a target handle (top).
Click on nodes to configure them:
Cold Email: Enter the recipient email address (use your test/Ethereal email!), subject, and body.
Wait/Delay: Enter the duration (currently configured for minutes for easier demo; check frontend/src/components/CustomNodes/WaitNode.js for the current unit).
Ensure your flow starts with a "Lead Source" node and proceeds through Wait/Delay nodes to Cold Email nodes.
Click the "Save Flow" button. You should see a success alert.
Verify Scheduling: If running locally, check your backend console. If using Render, check the logs on your Render dashboard for the backend service. You should see logs indicating that the flow was processed and email jobs were scheduled by Agenda for the future time(s).
Wait for the delay period(s) you set in the "Wait/Delay" nodes.
Check the inbox of the recipient email address you entered in the "Cold Email" node. You should receive the email(s) sent by your application.
Click the "Load Flow" button to retrieve and display the most recently saved flow.
Troubleshooting
[React Flow]: Seems like you have not used zustand provider...: Ensure <FlowBuilder /> is rendered within <ReactFlowProvider>. Check frontend/src/App.js and frontend/src/FlowBuilder.js (where useReactFlow is used).
[React Flow]: It looks like you've created a new nodeTypes...: Move nodeTypes definitions outside the component or use useMemo as shown in the corrected FlowBuilder.js.
AxiosError: Request failed with status code 401 on /api/flows or /api/flows/latest: You are trying to access protected routes without a valid token. This means you are not logged in, or the token stored is invalid/expired.
AxiosError: Request failed with status code 401 on /api/auth/login: The backend is rejecting your login attempt. Verify the email and password you are using are correct and match a registered user in the database. Check your backend console for logs within the authService.login function to see if a user is found and if the password comparison (bcrypt.compare) is succeeding.
Error: Cannot find module '/opt/render/project/src/backend/src/server.js' on Render: This is usually a case sensitivity issue. Ensure the casing of backend, src, and server.js on GitHub and in your backend/package.json start script (node src/server.js) are exactly the same. Also, confirm the Root Directory in Render is set to backend/.
Emails not sending:
Check your backend logs for Nodemailer errors or Agenda scheduling errors.
Verify your email credentials and SMTP settings in the backend/.env (or Render env vars). Double-check EMAIL_SECURE is set correctly ("true" or "false").
Ensure your email provider allows sending from this account via third-party applications (e.g., App Passwords for Gmail/Outlook).
If using Ethereal, ensure you are checking the correct temporary inbox URL.
Check the "Wait/Delay" duration and the scheduled time in the backend logs to confirm you've waited long enough.
Line Ending Warnings (LF will be replaced by CRLF): These are harmless Git warnings related to cross-platform line endings. You can ignore them or configure Git's core.autocrlf setting globally if they bother you.
Potential Improvements
More sophisticated flowchart logic (branching based on conditions, merging paths).
Additional node types (e.g., Send SMS, Add Tag, HTTP Request, Decision nodes).
HTML email editing.
Managing multiple flows per user (naming, listing, deleting flows).
Flow analytics (open rates, click rates - requires tracking).
Real-time job status monitoring in the frontend.
Frontend validation for node input fields.
Improved error handling and user feedback.
Unit and integration tests.
License
This project is licensed under the MIT License.
Author
AADITYA