-- first remove any data that may be present
TRUNCATE  users, tours RESTART IDENTITY CASCADE;

-- insert some users
INSERT INTO users
  (f_name, l_name, email, password)
  VALUES
    ('Michael', 'Anokye', 'michaelanokyej@yahoo.com', 'wanderpassword123');

-- insert some tours
INSERT INTO tours
  (name, img, description, city, state, max_tourists, policies, guide_username, guide_id)
  VALUES
    ('National Mall Tour', 'https://source.unsplash.com/ra3oAd6hrnM', 'bjadlrjkuaergklhjertijlbeijrluijbst', 'Washington', 'DC', 1, 'Check-in 30 minutes before tour start', 'michaelanokyej@yahoo.com', 1),
    ('DC Tour', 'https://source.unsplash.com/RJogiATgkcg', 'bjadlrjkuaergklhjertijlbeijrluijbst', 'Washington', 'DC', 10, 'Check-in flexible', 'michaelanokyej@yahoo.com', 1),
    ('Capitol Tour', 'https://source.unsplash.com/TRkDaJGK2yE', 'bjadlrjkuaergklhjertijlbeijrluijbst','Washington', 'DC', 2, 'Check-in an hour before tour start', 'michaelanokyej@yahoo.com', 1);
