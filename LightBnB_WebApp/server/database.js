const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect()
.then(() => console.log('db connected'))
.catch(err => console.error('db connection error', err.stack));
/// Users

/**
 * Get a single user from the database given their email.
*/
const getUserWithEmail = function(email) {
  return pool.query(`SELECT * FROM users where email = $1`, [email])
  .then((result) => {return result.rows[0] 
   })
  .catch((err) => {
    console.log(err.message);
  });
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
*/

const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users where id = $1`, [id])
  .then((result) => {
    return result.rows[0] 
   })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
*/

const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password= user.password;

  const queryString = 
   `INSERT INTO users (name, email, password)  VALUES($1, $2, $3)
   RETURNING *;`
  
  
  const values = [name, email, password];
  return pool.query(queryString,values)
    .then((result) => {return result.rows})
    .catch((err) =>   {console.log(err.message); });

}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
*/
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  const values = [guest_id, limit];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return console.log(err.message);
    });
}



exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
*/
const getAllProperties = (options, limit) => {
// 1 Setup an array to hold any parameters that may be available for the query
const queryParams = [];
// 2 Start the query with all information that comes before the WHERE clause.
let queryString = `
SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
`;

// 3 Check if a city, owner_id or price_per_night has been passed in as an option. Add them to the params array and create a WHERE clause
if (options.city) {
  queryParams.push(`%${options.city}%`);
  queryString += `WHERE city LIKE $${queryParams.length} `;
}

if (options.owner_id) {
  queryParams.push(options.owner_id);
  if (queryParams.length === 1) {
    queryString += `WHERE owner_id = $${queryParams.length} `;
  } else {
    queryString += `AND owner_id = $${queryParams.length} `;
  }
}

if (options.minimum_price_per_night && options.maximum_price_per_night) {
  queryParams.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
  if (queryParams.length === 2) {
    queryString += `WHERE cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
  } else {
    queryString += `AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
  }
}

// 4 Add any query that comes after the WHERE clause.
queryString += `
GROUP BY properties.id
`;

if (options.minimum_rating) {
  queryParams.push(options.minimum_rating);
  queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
}

queryParams.push(limit);
queryString += `
ORDER BY cost_per_night
LIMIT $${queryParams.length};
`;

// 5 Console log everything just to make sure we've done it right.
//console.log(queryString, queryParams);

// 6 Run the query.
return pool.query(queryString, queryParams)
.then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
*/
const addProperty = function(property) {
const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];
  
  return pool.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('query error:', err);
    })
  }   
exports.addProperty = addProperty;
