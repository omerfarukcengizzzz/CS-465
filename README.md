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

### Author
Omer Cengiz | SNHU | CS-465 Full Stack Development