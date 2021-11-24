INSERT INTO users (name, email, password) 
    VALUES (
    'Robert Sanders', 'robertsanders@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    'Robert Erwin', 'rerwin@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    'Olivia James', 'oliviaj@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Lightlagoon', 'description', 'https://media.istockphoto.com/photos/stunning-luxury-home-exterior-at-sunset-picture-id682432560?k=6&m=682432560&s=612x612&w=0&h=0AizQj5ou7gpIn4dcm7xWS4yMSQUnnHz5Bg73DzcpcI=', 'https://media.istockphoto.com/photos/stunning-luxury-home-exterior-at-sunset-picture-id682432560?k=6&m=682432560&s=612x612&w=0&h=0AizQj5ou7gpIn4dcm7xWS4yMSQUnnHz5Bg73DzcpcI=', 500, 2, 3, 2, 'Canada', '4434 Nowhere', 'Run', 'Yukon', 'V4F0E3'),
(2, 'By the Bays', 'description', 'https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-with-green-grass-and-landscaped-yard-picture-id856794608?k=6&m=856794608&s=612x612&w=0&h=Zj19xfoLCw35hQVUj8AJb2KxKiV6lnUXSBORrCvLouA=', 'https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-with-green-grass-and-landscaped-yard-picture-id856794608?k=6&m=856794608&s=612x612&w=0&h=Zj19xfoLCw35hQVUj8AJb2KxKiV6lnUXSBORrCvLouA=', 120, 1, 2, 2, 'Russia', 'Oktyabrskaya, bld. 15, appt. 57', 'Magnitogorsk', 'CHelyabinskaya oblast', 'R0S1A5'),
(3, 'Serene', 'description', 'https://media.istockphoto.com/photos/home-and-healthy-front-yard-during-late-spring-season-picture-id957895328?k=6&m=957895328&s=612x612&w=0&h=jE3tvHz1gReCYq_8w5WtgjOGxd06S2E0vXHJpZRrfLM=', 'https://media.istockphoto.com/photos/home-and-healthy-front-yard-during-late-spring-season-picture-id957895328?k=6&m=957895328&s=612x612&w=0&h=jE3tvHz1gReCYq_8w5WtgjOGxd06S2E0vXHJpZRrfLM=', 80, 0, 1, 1, 'Canada', '32452 Moose Blvd', 'Edmonton', 'Alberta', 'E1C9A2');


INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
VALUES (2, 2, '2019-01-04', '2019-02-01'),
VALUES (3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
(2, 2, 2, 4, 'Quiet and Serene'),
(3, 3, 3, 3, 'Average');