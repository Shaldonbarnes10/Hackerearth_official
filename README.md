# HackerEarth Official

A full-stack web application built with modern technologies for resource management and user authentication. This project demonstrates best practices in monorepo architecture, combining a robust Express.js backend with a dynamic React frontend.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool for fast development
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Icon library
- **EmailJS** - Client-side email service
- **Google Cloud APIs** - Google Calendar integration
- **XLSX** - Spreadsheet manipulation

### Backend
- **Express.js 5** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **Google Auth Library** - OAuth2 authentication
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Serverless HTTP** - Lambda function adapter

### Development Tools
- **Concurrently** - Run multiple npm scripts simultaneously
- **ts-node** - TypeScript execution for Node.js
- **Nodemon** - Auto-restart development server
- **ESLint** - Code quality and style
- **Tailwind CSS** - Styling framework

## 📁 Project Structure

```
.
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # Sequelize models
│   │   ├── routes/            # API routes
│   │   ├── index.ts           # Server entry point
│   │   └── testDb.ts          # Database testing utilities
│   ├── dist/                  # Compiled JavaScript
│   ├── package.json
│   ├── tsconfig.json
│   └── schema.sql             # Database schema
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context (Theme, Auth)
│   │   ├── assets/            # Static assets
│   │   ├── lib/               # Utility functions
│   │   ├── App.tsx            # Root component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Public assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── package.json               # Root package configuration
└── README.md                  # This file
```

## 🛠️ Installation

### Prerequisites
- **Node.js** 18+ and npm
- **PostgreSQL** 12+ (running locally or remotely)
- Environment variables configured (see Configuration)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shaldonbarnes10/Hackerearth_official.git
   cd Hackerearth_official
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Ensure PostgreSQL is running
   - Run the schema:
     ```bash
     psql -U postgres -d your_db_name -f backend/schema.sql
     ```

4. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```env
     # Backend Configuration
     DATABASE_URL=postgresql://user:password@localhost:5432/dbname
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     
     # Frontend Configuration
     VITE_API_URL=http://localhost:3001
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
     ```

5. **Install frontend and backend dependencies**
   ```bash
   npm install --prefix ./frontend
   npm install --prefix ./backend
   ```

## 📝 Available Scripts

### Root Level (Monorepo)

```bash
# Start both frontend and backend in development mode
npm run dev

# Start only the backend
npm run backend

# Start only the frontend
npm run frontend
```

### Backend

```bash
cd backend

# Build TypeScript to JavaScript
npm run build

# Start the production server
npm start

# Development with auto-reload (configured in root)
```

### Frontend

```bash
cd frontend

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Lint code with ESLint
npm run lint
```

## 🔐 Authentication

This project uses Google OAuth2 for authentication:

1. Set up a Google Cloud Project
2. Create OAuth2 credentials (Web application)
3. Add your client ID and secret to `.env`
4. Configure authorized redirect URIs in Google Cloud Console
5. The `AuthContext` in the frontend handles authentication state

## 💾 Database Schema

The application uses PostgreSQL with the following main tables:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(32),
    email VARCHAR(150) UNIQUE NOT NULL
);
```

Additional tables can be created by modifying `backend/schema.sql` and running migrations.

## 📚 Key Features

- **User Authentication** - Google OAuth2 integration
- **Resource Management** - Display and manage resources
- **Email Integration** - EmailJS for sending emails
- **Google Calendar Sync** - Integration with Google Calendar API
- **Data Export** - XLSX file generation and parsing
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Enhanced UX with Framer Motion
- **Dark/Light Theme** - Theme context for dynamic styling

## 🚀 Deployment

### Backend Deployment
The backend includes `serverless-http` for AWS Lambda compatibility. Deploy to:
- AWS Lambda
- Heroku
- Railway
- DigitalOcean App Platform
- Vercel (with serverless functions)

### Frontend Deployment
Deploy the built frontend to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform's configuration.

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready -h localhost`
- Check DATABASE_URL format and credentials
- Ensure the database exists

### Port Already in Use
- Backend default port: 3001
- Frontend default port: 5173
- Change ports in respective config files if needed

### Missing Dependencies
Run `npm install` in the root directory to install all dependencies

## 📖 Component Documentation

### Frontend Context
- **ThemeContext** - Manages dark/light theme state
- **AuthContext** - Manages user authentication state

### Key Components
- **Navbar** - Navigation header
- **ResourceDisplay** - Resource showcase component
- **TypingHero** - Animated hero section
- **CustomCursor** - Custom mouse cursor
- **Testimonials** - User testimonials section
- **Footer** - Footer component

### Backend Routes
- `/auth/*` - Authentication endpoints (Google OAuth)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch for your feature: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Add your feature"`
3. Push to your branch: `git push origin feature/your-feature`
4. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Keep components small and reusable

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📧 Contact & Support

For questions or issues, please:
- Open an issue on GitHub
- Contact the maintainers

## 🎯 Roadmap

- [ ] User profile management
- [ ] Advanced resource filtering
- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests
- [ ] CI/CD pipeline setup

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Express.js](https://expressjs.com/)
- Database by [PostgreSQL](https://www.postgresql.org/)
