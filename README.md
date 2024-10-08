Security Features
User Registration and Password Policies
Passwords must include uppercase, lowercase, numbers, and special characters.
Passwords are hashed using bcrypt with a salt round of 10.
Real-time password strength assessment is implemented.
Session Management
JWT (JSON Web Tokens) is used for secure session management.
Sessions expire after 7 days to reduce the risk of session hijacking.
Users are prompted to change passwords every 90 days.
Input Validation and Sanitization
DOMPurify is used to sanitize user inputs, preventing XSS attacks.
Input fields are validated for length, type, and format.
Data Encryption
Data transmitted between client and server is encrypted using HTTPS.
Sensitive information such as passwords is securely hashed before storage.
Role-Based Access Control (RBAC)
Different user roles (admin, normal user) have different levels of access.
Strict HTTP method usage to prevent unauthorized actions.
Software Details
Frontend Framework and Libraries
React: Core frontend framework.
React Router: Handles secure navigation within the app.
Axios: Manages HTTP requests, supports authentication tokens.
Tailwind CSS & DaisyUI: Used for styling the application, reducing risks like CSS injection.
Backend Framework and Libraries
Node.js & Express: Backend framework with middleware for security.
Helmet.js: Secures HTTP headers to protect against web vulnerabilities.
bcryptjs: Hashes passwords securely.
cors: Manages Cross-Origin Resource Sharing, ensuring secure resource access.
jsonwebtoken: Implements JWT for session management.
Database
MongoDB: NoSQL database with robust authentication and encrypted storage.
RBAC: Manages user permissions and access levels.