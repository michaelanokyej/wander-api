-- first remove any data that may be present
TRUNCATE  users, tours RESTART IDENTITY CASCADE;

-- insert some users
INSERT INTO users
  (f_name, l_name, email, password)
  VALUES
    ('Michael', 'Anokye', 'michaelanokyej@yahoo.com', 'wanderpassword123');

-- insert some tours
INSERT INTO tours
  (tour_name, img, description, city, state, max_tourists, policies, guide_id)
  VALUES
    ('National Mall Tour', 'https://source.unsplash.com/ra3oAd6hrnM', 'bjadlrjkuaergklhjertijlbeijrluijbst', 'Washington', 'DC', 1, 'Check-in 30 minutes before tour start', 1),
    ('DC Tour', 'https://source.unsplash.com/RJogiATgkcg', 'Washington', 'bjadlrjkuaergklhjertijlbeijrluijbst', 'DC', 10, 'Check-in flexible', 1),
    ('Capitol Tour', 'https://source.unsplash.com/TRkDaJGK2yE', 'Washington', 'bjadlrjkuaergklhjertijlbeijrluijbst', 'DC', 2, 'Check-in an hour before tour start', 1);
