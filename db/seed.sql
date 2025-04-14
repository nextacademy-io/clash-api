-- Drop existing tables if they exist
DROP TABLE IF EXISTS clash_participants;
DROP TABLE IF EXISTS clash;
DROP TABLE IF EXISTS peer;

-- Create the peer table
CREATE TABLE peer (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    pictureUrl TEXT NOT NULL
);

-- Create the clash table
CREATE TABLE clash (
    id INTEGER PRIMARY KEY,
    createdByPeerId INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    pictureUrl TEXT NOT NULL,
    FOREIGN KEY (createdByPeerId) REFERENCES peer (id)
);

-- Create the clash_participants join table
CREATE TABLE clash_participants (
    clashId INTEGER NOT NULL,
    peerId INTEGER NOT NULL,
    PRIMARY KEY (clashId, peerId),
    FOREIGN KEY (clashId) REFERENCES clash (id),
    FOREIGN KEY (peerId) REFERENCES peer (id)
);

-- Insert data into the peer table
INSERT INTO peer (id, name, gender, city, country, pictureUrl) VALUES
(1, 'John Doe', 'Male', 'Berlin', 'Germany', 'https://randomuser.me/api/portraits/men/1.jpg'),
(2, 'Jane Doe', 'Female', 'London', 'United Kingdom', 'https://randomuser.me/api/portraits/women/1.jpg'),
(3, 'John Smith', 'Male', 'New York', 'United States', 'https://randomuser.me/api/portraits/men/2.jpg'),
(4, 'Jane Smith', 'Female', 'Toronto', 'Canada', 'https://randomuser.me/api/portraits/women/2.jpg'),
(5, 'Michael Brown', 'Male', 'Paris', 'France', 'https://randomuser.me/api/portraits/men/3.jpg'),
(6, 'Sarah Lee', 'Female', 'Sydney', 'Australia', 'https://randomuser.me/api/portraits/women/3.jpg'),
(7, 'David Williams', 'Male', 'San Francisco', 'United States', 'https://randomuser.me/api/portraits/men/4.jpg'),
(8, 'Emily Harris', 'Female', 'Vancouver', 'Canada', 'https://randomuser.me/api/portraits/women/4.jpg'),
(9, 'James Johnson', 'Male', 'Los Angeles', 'United States', 'https://randomuser.me/api/portraits/men/5.jpg'),
(10, 'Olivia Brown', 'Female', 'Madrid', 'Spain', 'https://randomuser.me/api/portraits/women/5.jpg'),
(11, 'William Miller', 'Male', 'Chicago', 'United States', 'https://randomuser.me/api/portraits/men/6.jpg'),
(12, 'Sophia Wilson', 'Female', 'Berlin', 'Germany', 'https://randomuser.me/api/portraits/women/6.jpg'),
(13, 'Ethan Moore', 'Male', 'Austin', 'United States', 'https://randomuser.me/api/portraits/men/7.jpg'),
(14, 'Ava King', 'Female', 'London', 'United Kingdom', 'https://randomuser.me/api/portraits/women/7.jpg'),
(15, 'Alexander Scott', 'Male', 'Montreal', 'Canada', 'https://randomuser.me/api/portraits/men/8.jpg'),
(16, 'Mia Adams', 'Female', 'Paris', 'France', 'https://randomuser.me/api/portraits/women/8.jpg'),
(17, 'Daniel Clark', 'Male', 'Barcelona', 'Spain', 'https://randomuser.me/api/portraits/men/9.jpg'),
(18, 'Isabella Harris', 'Female', 'Sydney', 'Australia', 'https://randomuser.me/api/portraits/women/9.jpg'),
(19, 'Matthew Nelson', 'Male', 'San Francisco', 'United States', 'https://randomuser.me/api/portraits/men/10.jpg'),
(20, 'Charlotte Green', 'Female', 'Vancouver', 'Canada', 'https://randomuser.me/api/portraits/women/10.jpg');

-- Insert data into the clash table
INSERT INTO clash (id, createdByPeerId, title, description, date, location, address, pictureUrl) VALUES
(1, 1, 'Let''s meet for a coffee', 'I''m new in town and would like to meet new people', '2022-01-01', 'Starbucks', 'Alexanderplatz 1, 10178 Berlin', 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322053/people-having-coffee-together.jpg'),
(2, 2, 'Lunch at The Grill', 'Let''s grab some lunch and talk about tech innovations', '2023-02-10', 'The Grill', 'Oxford Street, London', 'https://image.lexica.art/full_webp/073ec0b1-b9fd-47bb-a3d2-c3c1c0cc6923'),
(3, 3, 'Tech Talk Meetup', 'Let''s discuss the future of AI and machine learning', '2023-03-15', 'NYC Tech Hub', '5th Avenue, New York, NY', 'https://image.lexica.art/full_webp/16b65f74-55c8-40a6-9b81-17d099166324'),
(4, 4, 'Walk in the Park', 'Let''s go for a walk in the park and have a friendly chat', '2023-04-05', 'High Park', 'Toronto, ON', 'https://image.lexica.art/full_webp/4c4022b5-d58d-4eb8-b629-667c901dae6d'),
(5, 5, 'Sightseeing in Paris', 'Join me for a city tour and explore the best places in Paris', '2023-05-20', 'Eiffel Tower', 'Champ de Mars, 75007 Paris', 'https://image.lexica.art/full_webp/051f5fe9-7005-461d-bbbe-6cad5dc0615e'),
(6, 6, 'Yoga in the Park', 'Let''s practice some yoga and enjoy the fresh air', '2023-06-10', 'Royal Botanic Gardens', 'Sydney, NSW', 'https://image.lexica.art/full_webp/091059b6-b34f-4fd7-a353-ab04fe448e01'),
(7, 7, 'Startups and Innovation Chat', 'Join us to share ideas on the future of startups and innovation', '2023-07-15', 'Silicon Valley Innovation Center', 'San Jose, CA', 'https://image.lexica.art/full_webp/2cad99c7-8007-4d72-84c2-7e443b5b807a'),
(8, 8, 'Beach Party', 'Let''s enjoy the weekend with a fun beach party!', '2023-08-25', 'Bondi Beach', 'Sydney, NSW', 'https://image.lexica.art/full_webp/f2d52c30-888a-4aad-a256-abc1622af590'),
(9, 9, 'Art Gallery Visit', 'Join me for an afternoon of art exploration', '2023-09-05', 'Los Angeles Art Museum', 'Los Angeles, CA', 'https://image.lexica.art/full_webp/9a1e71a4-e246-4576-998c-858a0f1422da');

-- Insert data into the clash_participants table
INSERT INTO clash_participants (clashId, peerId) VALUES
(1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 1), (2, 3), (2, 6), (2, 7),
(3, 2), (3, 4), (3, 5), (3, 8),
(4, 1), (4, 6), (4, 9), (4, 10),
(5, 7), (5, 12), (5, 14),
(6, 3), (6, 7), (6, 11), (6, 15),
(7, 8), (7, 9), (7, 10), (7, 18),
(8, 1), (8, 2), (8, 5), (8, 6),
(9, 3), (9, 12), (9, 13);