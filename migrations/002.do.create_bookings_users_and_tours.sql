-- DROP the tables and constraints
DROP TABLE IF EXISTS tours;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS guides;



-- create the users table, it depends on no other
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  f_name TEXT NOT NULL,
  l_name TEXT NOT NULL,
  userName VARCHAR NOT NULL,
  email TEXT NOT NULL,
  password varchar NOT NULL
);

-- create the guides table with the foreign key
CREATE TABLE guides (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username VARCHAR NOT NULL,
  email TEXT NOT NULL,
  primaryuserid INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- create the tours table with the foreign key
CREATE TABLE tours (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  description TEXT NOT NULL,
  max_tourists INTEGER,
  img VARCHAR NOT NULL,
  policies TEXT NOT NULL,
  guide_username VARCHAR NOT NULL,
  guide_email VARCHAR NOT NULL,
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE,
  posted TIMESTAMP DEFAULT NOW()
);

-- create the guides table with the foreign key
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  tour_id INTEGER REFERENCES tours(id) ON DELETE CASCADE,
  tour_name VARCHAR NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  guide_id INTEGER REFERENCES guides(id) ON DELETE CASCADE, 
  checkIn DATE NOT NULL,
  checkOut DATE NOT NULL,
  posted TIMESTAMP DEFAULT NOW()
);
