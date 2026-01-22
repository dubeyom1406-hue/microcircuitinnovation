# Microcircuits Backend Setup

This project includes a backend API for the Microcircuits admin panel.

## Project Structure

```
microcircuits/
├── microcircuits/          # Frontend React application
├── server/                 # Backend Node.js/Express server
│   ├── server.js           # Main server file
│   ├── routes/             # API routes
│   │   ├── admin.js        # Admin authentication
│   │   ├── vacancies.js    # Job vacancies management
│   │   ├── caseStudies.js  # Case studies management
│   │   ├── applications.js # Job applications
│   │   └── contacts.js     # Contact messages
│   └── package.json
└── start-dev.bat           # Script to start both servers
```

## Setup Instructions

1. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```

2. **Environment Variables** (optional):
   Create a `.env` file in the `server/` directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/microcircuits
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

3. **Start Backend**:
   ```bash
   npm run dev
   ```

4. **Frontend Setup**:
   ```bash
   cd microcircuits
   npm install
   npm run dev
   ```

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login

### Vacancies Management
- `GET /api/vacancies` - Get all vacancies
- `POST /api/vacancies` - Create a new vacancy
- `PUT /api/vacancies/:id` - Update a vacancy
- `DELETE /api/vacancies/:id` - Delete a vacancy

### Case Studies Management
- `GET /api/case-studies` - Get all case studies
- `POST /api/case-studies` - Create a new case study
- `PUT /api/case-studies/:id` - Update a case study
- `DELETE /api/case-studies/:id` - Delete a case study

### Applications Management
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create a new application
- `DELETE /api/applications/:id` - Delete an application

### Contact Messages Management
- `GET /api/contacts` - Get all contact messages
- `POST /api/contacts` - Create a new contact message
- `DELETE /api/contacts/:id` - Delete a contact message

## Running Both Servers

Use the batch script to start both servers at once:
```bash
start-dev.bat
```

## Admin Panel Access

- Navigate to `/admin-login` to access the admin panel
- Default credentials: 
  - Username: `admin`
  - Password: `12345`

## Frontend Integration

The frontend automatically connects to the backend through a proxy configured in `vite.config.js`. All API calls to `/api/*` are forwarded to `http://localhost:5000`.

## Features

- **Backend API**: Full CRUD operations for all content types
- **Authentication**: JWT-based admin authentication
- **Responsive Admin Panel**: Improved UI/UX for content management
- **Database Ready**: MongoDB integration (uses in-memory storage in development)
- **Real-time Updates**: Frontend updates automatically when content changes in admin panel