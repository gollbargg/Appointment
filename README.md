
# Appointment Scheduler Application

This project is a comprehensive appointment scheduling application designed to facilitate easy creation, editing, and deletion of appointments between clients (buyers) and company staff (vendors).
Built with React and TypeScript on the frontend and Node.js on the backend, it features a RESTful API and utilizes SQLite for data management.
Key functionalities include a user-friendly interface for managing appointment details such as title, type (virtual or physical), location (for physical meetings), and the scheduling times.Enhanced with Material-UI.
State management is elegantly handled using Zustand, ensuring a seamless user experience. 
The project also demonstrates best practices for component structure, making extensive use of modular, reusable React components.
For data initialization and testing purposes, Knex.js is employed to seed the database with sample data, providing a solid foundation for development and demonstration.

## How to Run the App

### Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd /backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Run migrations to set up your database schema:
     ```bash
     npx knex migrate:latest
     ```
   - Seed the database with initial data:
     ```bash
     npx knex seed:run
     ```

4. **Start the Backend Server**:
   ```bash
   npm start
   ```
   This command will start the backend server, typically listening on `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd /frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**: Ensure any required environment variables are set up, such as the backend API URL, if it's customizable.

4. **Start the Frontend Development Server**:
   ```bash
   npm start
   ```
   This command will start the frontend development server, typically available at `http://localhost:3001`. Your default web browser should open automatically to this address.

### Accessing the Application

With both servers running, you can now access the application through your web browser at the address provided by the frontend server (`http://localhost:3001`). You should be able to view, create, edit, and delete appointments using the UI.

### Troubleshooting

- If you encounter any issues connecting the frontend to the backend, check that the backend server is running and accessible, and verify any configured environment variables for accuracy.
- For database-related issues, ensure that your database server is running, and your migration and seed scripts have executed successfully.

By following these steps, you'll have the application up and running on your local development environment, ready for use and further development.
