# CS-465 Full Stack Development
## Travlr Getaways - Travel Booking Application

### Project Overview
A full-stack MEAN (MongoDB, Express, Angular, Node.js) travel booking application with customer-facing website and admin SPA.

### Architecture

**Frontend:**
- **Customer Site**: Express with Handlebars (HBS) templating - Server-side rendering for SEO and performance
- **Admin SPA**: Angular 17 - Single Page Application for dynamic admin interface

**Backend:**
- **API**: RESTful API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport.js, PBKDF2 password hashing

### Features

**Customer-Facing Website:**
- Browse trips with search and category filtering (beach, cruise, mountain)
- User registration and login with JWT authentication
- Shopping cart system
- Trip booking with traveler count and date selection
- Checkout process with order summary
- My Bookings page to view and cancel reservations
- User account page with booking statistics

**Admin SPA:**
- Trip management (Add, Edit, Delete)
- User management (View, Delete)
- Booking management (View, Update Status, Delete)
- Statistics dashboard
- JWT-protected routes

### Installation

1. **Install Dependencies:**
```bash
npm install
cd app_admin
npm install
cd ..
```

2. **Environment Setup:**
Create `.env` file in root:
```
MONGO_URI=mongodb://localhost:27017/travlr
JWT_SECRET=your_secret_key_here
```

3. **Start MongoDB:**
```bash
mongod
```

4. **Seed Database (Optional):**
```bash
node seed.js
```

5. **Start Backend Server:**
```bash
npm start
```
Server runs on http://localhost:3000

6. **Start Angular Admin (separate terminal):**
```bash
cd app_admin
ng serve
```
Admin runs on http://localhost:4200

### Project Structure

```
travlr/
├── app_admin/              # Angular admin SPA
│   ├── src/app/
│   │   ├── components/     # Angular components
│   │   ├── models/         # TypeScript interfaces
│   │   └── services/       # Data services
├── app_api/                # Backend API
│   ├── controllers/        # API logic
│   ├── models/            # Mongoose schemas
│   └── routes/            # API routes
├── app_server/            # Customer-facing server
│   ├── controllers/       # Route controllers
│   ├── routes/           # Express routes
│   └── views/            # Handlebars templates
├── public/               # Static assets
└── app.js               # Main Express app
```

### API Endpoints

**Trips:**
- GET `/api/trips` - List all trips
- POST `/api/trips` - Add trip (protected)
- GET `/api/trips/:tripCode` - Get single trip
- PUT `/api/trips/:tripCode` - Update trip (protected)
- DELETE `/api/trips/:tripCode` - Delete trip (protected)

**Authentication:**
- POST `/api/register` - Register user
- POST `/api/login` - Login user

**Bookings:**
- GET `/api/bookings` - List all bookings (protected)
- POST `/api/bookings` - Create booking (protected)
- GET `/api/bookings/user/:email` - Get user bookings (protected)
- PUT `/api/bookings/:bookingId` - Update booking (protected)
- PATCH `/api/bookings/:bookingId/status` - Update status (protected)
- DELETE `/api/bookings/:bookingId` - Delete booking (protected)

**Cart:**
- GET `/api/cart/:email` - Get cart (protected)
- POST `/api/cart/:email/items` - Add to cart (protected)
- PUT `/api/cart/:email/items/:tripCode` - Update cart item (protected)
- DELETE `/api/cart/:email/items/:tripCode` - Remove from cart (protected)
- POST `/api/cart/:email/checkout` - Checkout cart (protected)

**Users:**
- GET `/api/users` - List users (protected)
- GET `/api/users/:userId` - Get user (protected)
- DELETE `/api/users/:userId` - Delete user (protected)

### Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: Angular 17, Handlebars (HBS)
- **Authentication**: JWT, Passport.js, PBKDF2
- **Styling**: CSS3, Bootstrap (admin)

### Security Features

- JWT token-based authentication
- Password hashing with PBKDF2
- Protected API endpoints
- Secure HTTP-only cookies for customer site
- Authorization headers for admin SPA

### Testing

**Customer Site:** http://localhost:3000
- Register/Login
- Browse trips
- Add to cart
- Complete checkout
- View bookings

**Admin Site:** http://localhost:4200
- Login with admin credentials
- Manage trips, users, and bookings

---

## Project Reflection

### Architecture

**Frontend Development Comparison:**

This project utilized two distinct frontend approaches, each serving specific purposes. The customer-facing website uses Express with Handlebars (HBS) templating, which renders HTML on the server side. Each page request triggers a full server round-trip where templates are populated with data and sent as complete HTML to the browser. This traditional approach provides excellent SEO benefits since search engines can easily crawl the fully-rendered content, and it offers faster initial page loads for users with slower connections. The Express structure follows a straightforward MVC pattern with routes, controllers, and views organized in separate directories.

In contrast, the admin interface is built as an Angular 17 Single-Page Application (SPA) with a component-based architecture. The SPA loads once and dynamically updates only the necessary components when data changes, eliminating full page reloads. This creates a fluid, desktop-application-quality experience ideal for admin users who need to perform frequent CRUD operations. Angular's modular structure includes self-contained components with TypeScript logic, HTML templates, and CSS styling, along with services for API communication and guards for route protection. The SPA maintains application state throughout the session, provides real-time form validation, and enables features like dynamic data tables and modal dialogs that would be difficult to achieve with server-rendered pages.

**NoSQL MongoDB Database Choice:**

The backend uses MongoDB, a NoSQL database, for several compelling reasons. MongoDB's document-oriented structure stores data in flexible JSON-like documents (BSON), which naturally aligns with JavaScript objects used throughout the MEAN stack. This eliminates the impedance mismatch common with relational databases and allows for seamless data flow from database to API to frontend. The schema-less nature of MongoDB provided flexibility during development, allowing the data model to evolve as requirements changed without complex migrations. For a travel booking application with varying trip attributes (some trips have cruise-specific fields, others have mountain-specific amenities), MongoDB's flexible schema accommodates these differences elegantly. Additionally, MongoDB's horizontal scalability and performance with read-heavy operations make it well-suited for a customer-facing application where users frequently browse trips.

### Functionality

**JSON vs JavaScript:**

JSON (JavaScript Object Notation) is a lightweight data-interchange format that represents data as text, while JavaScript is a full programming language. JSON is a subset of JavaScript syntax used specifically for data serialization—it can only represent data structures (objects, arrays, strings, numbers, booleans, null) and cannot contain functions, methods, or executable code. JSON serves as the universal language that ties together frontend and backend development. When the Angular SPA requests trip data, the Express API queries MongoDB (which stores BSON), converts it to JSON, and sends it over HTTP. The Angular service receives this JSON, TypeScript deserializes it into typed objects, and components display the data. Similarly, when creating or updating trips, the Angular form data is serialized to JSON, transmitted to the API, validated, and stored in MongoDB. This JSON-based communication enables the decoupled architecture where frontend and backend can be developed, tested, and scaled independently.

**Code Refactoring and Reusable Components:**

Throughout development, I refactored code multiple times to improve functionality and efficiency. Initially, trip data was hardcoded in the Express controllers. I refactored this to use a centralized Trip model with Mongoose schemas, creating a single source of truth for data structure and validation. This eliminated code duplication and made the application more maintainable. When implementing the admin SPA, I created reusable Angular components like the trip card component, which displays trip information consistently across list and detail views. Rather than duplicating HTML and styling, the component accepts trip data as input and renders it uniformly. I also refactored authentication logic into a dedicated AuthenticationService that handles login, token storage, and token validation, which is used by both the login component and HTTP interceptors. The benefits of reusable UI components include reduced code duplication, consistent user experience, easier maintenance (fix once, apply everywhere), faster development of new features, and improved testability since components can be tested in isolation.

### Testing

**Methods, Endpoints, and Security:**

Testing a full stack application requires understanding HTTP methods, API endpoints, and security layers. HTTP methods (GET, POST, PUT, DELETE, PATCH) define the type of operation: GET retrieves data, POST creates new resources, PUT updates entire resources, PATCH partially updates resources, and DELETE removes resources. Each method has different testing requirements—GET requests should return correct data and status codes, while POST/PUT requests must validate request bodies, handle malformed data, and confirm database persistence.

API endpoints are the URLs that expose backend functionality (e.g., `/api/trips/:tripCode`). Testing endpoints involves verifying they accept correct parameters, return proper response codes (200 for success, 404 for not found, 401 for unauthorized, 500 for server errors), and return data in the expected JSON format. I used Postman to systematically test each endpoint, first without authentication to confirm the API structure, then with JWT tokens to verify security.

Security adds complexity to testing. Protected endpoints require valid JWT tokens in the Authorization header. Testing security involves verifying that endpoints reject requests without tokens (401 Unauthorized), reject expired or invalid tokens, and only allow authorized users to perform operations (e.g., only admins can delete users). I tested the authentication flow by registering users, logging in to receive tokens, using tokens in subsequent requests, and attempting to access protected resources without proper authentication. The Angular HTTP interceptor automatically attaches tokens to requests, so I verified this by monitoring network traffic in browser DevTools. Testing also included verifying that passwords are properly hashed (never stored in plain text) and that sensitive data isn't exposed in API responses.

### Reflection

**Professional Growth and Marketable Skills:**

This course has significantly advanced my capabilities as a full stack developer and made me a more competitive candidate in the software development field. I've gained hands-on experience with the complete MEAN stack, which is widely used in industry. Learning to architect applications with separate customer and admin interfaces demonstrates my understanding of real-world business requirements where different user types need different experiences.

The skills I've developed include building RESTful APIs with Express.js, implementing secure authentication with JWT and Passport.js, working with NoSQL databases using MongoDB and Mongoose, creating dynamic SPAs with Angular and TypeScript, and integrating frontend and backend systems. I've mastered the full development lifecycle from database design to API development to frontend implementation. Understanding both server-side rendering and SPA architectures allows me to choose the right tool for each use case.

Perhaps most importantly, I've learned to think architecturally about application design—considering security, scalability, user experience, and maintainability from the start. The experience of debugging across the full stack, testing API integrations, and implementing security features has prepared me for the complex challenges faced by professional developers. These practical skills, combined with the ability to articulate technical decisions (like why we chose MongoDB or why the admin uses an SPA), make me a well-rounded candidate who can contribute immediately to development teams working on modern web applications.

---

### Author
Omer Cengiz | SNHU | CS-465 Full Stack Development