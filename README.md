# Jirani Hub Capstone Project

## Project Overview

Jirani Hub is a comprehensive web application designed to connect users with various community services, events, listings, and social features. The platform aims to foster community engagement by providing a seamless interface for users to discover, interact, and transact within their local area.

## Key Features

- User authentication and profile management
- Event creation, browsing, and participation
- Service listings and marketplace functionality
- Real-time chat and alert systems
- Order placement and management
- Member directory and social networking features
- Responsive and intuitive dashboard layout

## Project Structure

### Frontend (Client)

- Built with React and Zustand for state management
- Organized into pages, layouts, components, and stores
- Uses Axios for API communication
- Tailwind CSS for styling
- Key directories:
  - `src/pages/`: Contains React page components (Dashboard, Chat, Services, etc.)
  - `src/layouts/`: Layout components for consistent UI structure
  - `src/store/`: Zustand stores managing application state (orderStore, authStore, chatStore, etc.)
  - `src/lib/`: Utility libraries and Axios instance configuration

### Backend (Server)

- Node.js with Express framework
- RESTful API endpoints for authentication, events, listings, orders, services, chat, and more
- MongoDB for data persistence (models defined in `server/models/`)
- Controllers handle business logic for each resource
- Middleware for authentication and file uploads
- Socket.io integration for real-time communication

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Jirani-Hub-Capstone-Project
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Configure environment variables as needed (e.g., database URI, JWT secrets).

4. Run the backend server:
   ```bash
   cd server
   npm start
   ```

5. Run the frontend development server:
   ```bash
   cd client
   npm start
   ```

6. Access the application at `http://localhost:3000` (or the configured port).

## Main Components and Pages

- **Dashboard**: Overview of user activities and quick access to features
- **Chat**: Real-time messaging with other users
- **Services**: Browse and request community services
- **Events**: Create and join local events
- **Marketplace**: Listings for buying and selling items
- **Member Directory**: Search and connect with community members
- **Order Management**: Place and track orders through the orderStore

## State Management

The frontend uses Zustand for state management with dedicated stores for different domains:

- `orderStore`: Manages orders, including placing, fetching, and retrieving by ID
- `authStore`: Handles user authentication state
- `chatStore`: Manages chat messages and connections
- Other stores for alerts, announcements, services, listings, and members

## API Endpoints Overview

- `/auth`: User login, registration, and authentication
- `/events`: Event CRUD operations
- `/listings`: Marketplace listings management
- `/orders`: Order placement and retrieval
- `/services`: Service listings and requests
- `/chat`: Messaging endpoints
- Additional endpoints for alerts, announcements, and members

## Testing

- Frontend: Test UI components and store actions using React Testing Library and Jest
- Backend: Test API endpoints with tools like Postman or Curl, covering happy paths and error cases
- Manual testing recommended for real-time features like chat and alerts

## Contribution Guidelines

- Follow coding standards and best practices
- Write clear commit messages
- Test changes thoroughly before submitting pull requests
- Document new features and APIs

## Support and Contact

For questions or support, please contact the project maintainers or open an issue on the repository.

---

This README provides a comprehensive overview of the Jirani Hub Capstone Project for users and panelists to understand the system architecture, features, and usage.
