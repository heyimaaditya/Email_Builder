# Email Flow Builder

A visual application for designing and implementing email marketing sequences using React Flow, Node.js, Express, MongoDB, Agenda, and Nodemailer.

## Features

*   Visual flowchart interface for building email sequences.
*   Nodes: Lead Source, Cold Email, Wait/Delay.
*   Drag-and-drop node creation.
*   Connecting nodes with edges.
*   Configuring email content (recipient, subject, body) and delay durations.
*   Saving the flowchart structure.
*   Backend processes saved flows and schedules emails using Agenda based on the flow structure and delays.
*   Emails are sent via Nodemailer.
*   User Authentication (Registration/Login) to associate flows with users.

## Technologies Used

*   **Frontend:** React, React Flow, Zustand (for state management), React Router, Axios
*   **Backend:** Node.js, Express, MongoDB, Mongoose, Agenda, Nodemailer, JWT, BCrypt, CORS, Dotenv

## Setup Instructions

### Prerequisites

*   Node.js and npm installed.
*   MongoDB installed and running.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd email-flow-builder