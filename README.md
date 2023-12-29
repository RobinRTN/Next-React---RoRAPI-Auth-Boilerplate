# Next-React---RoRAPI-Auth-Boilerplate

==Overview==

This boilerplate provides a foundation for a full-stack application using React Next.js for the frontend and Ruby on Rails for the backend. It features robust user authentication with Devise JWT for token-based authentication and integration with social OAuth providers (Google and Facebook).


==Features==

React Next.js Frontend:
- Utilizes React hooks and context for state management.
- Integrates Tailwind and some minor front config - possible to change easily all in globals.css
- Integrates Google and Facebook OAuth for user authentication.
- Implements token-based authentication using JWTs.
- Axios Setup with a component, when called for REST API request, includes the token from context in Authorization Header - redirects to connect page if rejected by backend
- Basic Dropdown navbar with main options - connected or disconnected users
- Dynamic Sign-In and Sign-Up forms with Formik and Regex to check the email structure
- Rendering the Username form once the user authenticated - change this component if needed but it is to show Auth Management in the App

Ruby on Rails Backend:
- API-only Rails application.
- Devise JWT for user authentication.
- OAuth integration for Google and Facebook with dedicated Socials_controller -> checks the authenticity of the Facebook/Google tokens and finds or create a user with the received informations
- No use of the :omniauth devise option as it is handled by the frontend and the socials_controller
- Secure endpoints with JWT token verification.


==Getting Started==

Clone the repository and follow the setup instructions for both frontend and backend parts of the application.

==Prerequisites==
- Node.js and npm (for React Next.js frontend)
- Ruby on Rails (for the backend API)
- PostgreSQL database
- Google and Facebook Developer accounts for OAuth setup


==Frontend Setup==

- Navigate to the frontend directory.
- Install dependencies: npm install.
- Configure environment variables:
- Set GOOGLE_CLIENT_ID and FACEBOOK_APP_ID in .env. files
- Run the frontend server: npm run dev.


==Backend Setup==

- Navigate to the backend directory.
- Install dependencies: bundle install.
- Setup the database: rails db:create db:migrate.
- Run the Rails server: rails s.
- Ensure redirect URIs are set correctly in Google and Facebook developer consoles.
JWT Secret Key:
- Generate and set the JWT Secret Key in the .env file (\\ bundle exec rake secret \\ in terminal)
- Change if needed the expiration time of the token set in the socials_controller and in devise.rb file


==Directory Structure==

/frontend: React Next.js application.
/backend: Ruby on Rails API-only application.


==API Endpoints==

/auth/google_oauth2: Endpoint for Google OAuth.
/auth/facebook/callback: Endpoint for Facebook OAuth.
Secure endpoints requiring JWT for access.
