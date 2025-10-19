const express = require('express'); // Express app
const router = express.Router(); // Router logic
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(401).json({ message: 'Token Validation Error!' });
        }
        req.auth = verified; // Set the auth param to the decoded object
    });
    next(); // We need to continue or this will hang forever
}

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)       // GET Method routes tripsList
    .post(authenticateJWT, tripsController.tripsAddTrip);  // POST Method adds a trip - PROTECTED

// GET Method routes tripsFindByCode - requires parameter   
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)      // GET single trip
    .put(authenticateJWT, tripsController.tripsUpdateTrip)      // PUT Method updates a trip - PROTECTED
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);  // DELETE Method deletes a trip - PROTECTED

// Authentication routes
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

module.exports = router;