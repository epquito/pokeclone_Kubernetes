# PokeClone Local App Deployment

This document provides a detailed guide for setting up and running the PokeClone application, which includes a Django backend and a React frontend created with Vite.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python 3
- pip (Python package manager)
- Node.js and npm (Node package manager)
- PostgreSQL

## Diagram

This outlines the local deployment structure of the PokeClone app, illustrating the Django backend running within a Python virtual environment on the user's local machine, which connects to a PostgreSQL database. The React frontend is served by Vite, and the web browser is where the frontend is accessed and interacts with the backend.

![Local Deployment Diagram](/images/local.png)

## Setup Instructions

### Setting Up the Backend

1. **Create and Activate a Python Virtual Environment**

   Navigate to the `back_end` directory of the project and run the following commands to create a Python virtual environment and activate it:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   This creates an isolated environment for Python projects, ensuring that each project has its own dependencies, separate from other projects.

2. **Install Dependencies**

   Install the required Python packages for the backend:

   ```bash
   pip install -r requirements.txt
   ```

   `requirements.txt` contains a list of packages necessary for the project to run.

3. **Create the Database**

   Log in to PostgreSQL and create the database required by Django:

   ```sql
   psql -U postgres
   CREATE DATABASE pokeclone_db;
   \q
   ```

   Replace `postgres` with your PostgreSQL username if different.

4. **Configure Environment Variables**

   Create a `.env` file in the `back_end` directory to store environment variables:

   ```bash
   echo "DJANGO_KEY='pikachu'" > .env
   ```

   Replace `'pikachu'` with your actual Django secret key.

5. **Apply Database Migrations**

   Apply migrations to set up your database schema:

   ```bash
   python3 manage.py migrate
   ```

6. **Create a Django Superuser**

   Create an administrative user for the Django admin interface:

   ```bash
   python3 manage.py createsuperuser
   ```

   Follow the prompts to set up the superuser account.

7. **Run the Backend Server**

   Start the Django development server:

   ```bash
   python3 manage.py runserver
   ```

   The backend API will be available at `http://127.0.0.1:8000`.

### Setting Up the Frontend

1. **Install Frontend Dependencies**

   Navigate to the `front_end` directory and install the necessary packages:

   ```bash
   npm install
   ```

2. **Run the Development Server**

   Start the Vite development server for the frontend:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## Usage

- Access the Django admin interface at `http://127.0.0.1:8000/admin` using the superuser credentials you created.
- Interact with the frontend application in your browser at `http://localhost:5173`.
