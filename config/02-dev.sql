INSERT INTO "user" (password, firstname, lastname, email, telephone, is_admin)
VALUES
    ('hashed_password11', 'Thomas', 'Durand', 'thomas.durand@example.com', '0601020304', TRUE),
    ('hashed_password12', 'Emma', 'Leclerc', 'emma.leclerc@example.com', '0611121314', FALSE),
    ('hashed_password13', 'Lucas', 'Bernard', 'lucas.bernard@example.com', '0622232425', FALSE),
    ('hashed_password14', 'Maxime', 'Robert', 'maxime.robert@example.com', '0633344546', FALSE),
    ('hashed_password15', 'Chloé', 'Joubert', 'chloe.joubert@example.com', '0644455657', FALSE),
    ('hashed_password16', 'Pierre', 'Gauthier', 'pierre.gauthier@example.com', '0655566768', FALSE),
    ('hashed_password17', 'Julien', 'Benoit', 'julien.benoit@example.com', '0666677879', FALSE),
    ('hashed_password18', 'Sarah', 'Moulin', 'sarah.moulin@example.com', '0677788990', FALSE),
    ('hashed_password19', 'Victor', 'Lemoine', 'victor.lemoine@example.com', '0688899001', FALSE),
    ('hashed_password20', 'Alice', 'Pires', 'alice.pires@example.com', '0699900112', FALSE);

INSERT INTO "vehicle" (model, year, km, type, price, brand, energy, category, description)
VALUES
    ('Clio', 2020, 15000, 'Vente', 12000, 'Renault', 'Essence', 'Citadine', 'Petite voiture économique et fiable.'),
    ('208', 2022, 5000, 'Vente', 18000, 'Peugeot', 'Electrique', 'Compacte', 'Compacte moderne et écologique.'),
    ('Model 3', 2023, 10000, 'Location', 500, 'Tesla', 'Electrique', 'Berline', 'Véhicule électrique haut de gamme.'),
    ('Golf', 2021, 12000, 'Vente', 22000, 'Volkswagen', 'Diesel', 'Compacte', 'Compacte pratique avec bon rendement.'),
    ('Tiguan', 2022, 8000, 'Location', 700, 'Volkswagen', 'Hybride', 'SUV', 'SUV hybride tout terrain.'),
    ('Mustang', 2020, 18000, 'Vente', 35000, 'Ford', 'Essence', 'Coupé', 'Voiture sport iconique.'),
    ('Model X', 2021, 5000, 'Location', 800, 'Tesla', 'Electrique', 'SUV', 'SUV électrique de luxe.'),
    ('Peugeot 3008', 2020, 25000, 'Vente', 28000, 'Peugeot', 'Diesel', 'SUV', 'SUV familial pratique et spacieux.'),
    ('Mini Cooper', 2021, 15000, 'Location', 400, 'Mini', 'Essence', 'Cabriolet', 'Cabriolet fun et dynamique.'),
    ('F-Type', 2022, 3000, 'Vente', 60000, 'Jaguar', 'Essence', 'Coupé', 'Voiture de sport haut de gamme.');

INSERT INTO "transaction" (id_vehicle, id_user, status, id_admin, start_time, end_time, validated_at)
VALUES
    (1, 1, 'Validé', 1, '2024-01-10', '2024-01-15', '2024-01-09 12:00:00'),
    (2, 2, 'En attente', 2, '2024-02-05', '2024-02-10', NULL),
    (3, 3, 'Refusé', 3, '2024-03-01', '2024-03-07', '2024-02-28 14:30:00'),
    (4, 4, 'Validé', 4, '2024-04-01', '2024-04-05', '2024-03-30 09:15:00'),
    (5, 5, 'En attente', 5, '2024-05-15', '2024-05-20', NULL),
    (6, 6, 'Refusé', 6, '2024-06-10', '2024-06-12', '2024-06-09 17:00:00'),
    (7, 7, 'Validé', 7, '2024-07-02', '2024-07-10', '2024-07-01 13:30:00'),
    (8, 8, 'En attente', 8, '2024-08-01', '2024-08-07', NULL),
    (9, 9, 'Refusé', 9, '2024-09-03', '2024-09-09', '2024-09-02 10:45:00'),
    (10, 10, 'Validé', 10, '2024-10-01', '2024-10-07', '2024-09-30 11:30:00');
