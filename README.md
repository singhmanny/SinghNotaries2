# E-Notary Website

This is an E-Notary website that allows users to sign up, log in, fill out e-notary forms, upload images, and schedule appointments through Calendly. The website has a React frontend, a Flask backend, and uses a sqlite3 database.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js and npm (Node Package Manager)
- Python 3.x
- virtualenv (for creating a virtual environment)

### Backend Setup

1. Navigate to the `flask-server` directory.
   ```
   cd flask-server
   ```

2. Create and activate a virtual environment (e.g., `myenv`).
   ```
   virtualenv myenv
   source myenv/bin/activate
   ```

3. Install the required Python packages.
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask backend.
   ```
   flask run
   ```

### Frontend Setup

1. Navigate to the `project` directory.
   ```
   cd project
   ```

2. Install the required npm packages.
   ```
   npm install
   ```

3. Start the React frontend.
   ```
   npm start
   ```

### Accessing the Website

Once the backend and frontend are running, you can access the website in your browser at `http://localhost:3000`.

## Features

- User authentication: Users can sign up and log in to access their dashboard.
- Dashboard: Users can view their personalized dashboard with links to fill out e-notary forms, upload images, and schedule appointments through Calendly.
- Calendly integration: The appointment scheduling feature integrates with Calendly to generate scheduling links with Zoom, payment, and document verification links included in the email.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Flask: Python web framework for building the backend.
- sqlite3: Lightweight database for storing user information.
- Calendly: Scheduling tool for managing appointments.

## License

This project is licensed under the [MIT License](LICENSE).

