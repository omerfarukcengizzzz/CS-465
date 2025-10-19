// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// const travel = (req, res) => {
//     res.render('travel', { title: "Travlr Getaways", trips });
// };

/* GET travel view */
const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

const travel = async function (req, res, next) {
    const searchQuery = req.query.search || '';
    const category = req.query.category || 'all';
    
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            let trips = json;
            let allTrips = json;

            if (!(json instanceof Array)) {
                message = json;
                trips = [];
                allTrips = [];
            } else {
                if (!json.length) {
                    message = "No trips exist in our database!";
                } else {
                    if (category !== 'all') {
                        trips = json.filter(trip => trip.category === category);
                    }

                    if (searchQuery) {
                        const lowerSearch = searchQuery.toLowerCase();
                        trips = trips.filter(trip => {
                            return trip.name.toLowerCase().includes(lowerSearch) ||
                                   trip.resort.toLowerCase().includes(lowerSearch) ||
                                   trip.description.toLowerCase().includes(lowerSearch) ||
                                   trip.code.toLowerCase().includes(lowerSearch);
                        });
                        
                        if (trips.length === 0) {
                            message = `No trips found matching "${searchQuery}"`;
                        } else {
                            message = `Found ${trips.length} trip(s) matching "${searchQuery}"`;
                        }
                    }
                }
            }

            const beachCount = allTrips.filter(t => t.category === 'beach').length;
            const cruiseCount = allTrips.filter(t => t.category === 'cruise').length;
            const mountainCount = allTrips.filter(t => t.category === 'mountain').length;

            res.render('travel', { 
                title: 'Travlr Getaways', 
                trips: trips, 
                message: message,
                searchQuery: searchQuery,
                category: category,
                beachCount: beachCount,
                cruiseCount: cruiseCount,
                mountainCount: mountainCount
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel
};