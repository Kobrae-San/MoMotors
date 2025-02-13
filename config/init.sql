CREATE TYPE energy AS ENUM ('Electrique','Diesel','Hybride','Essence');
CREATE TYPE brand AS ENUM ('Renault','Peugeot','Dacia','Citroën','Volkswagen','Toyota','Tesla','BMW','Mercedes','Ford','Audi','Hyundai','Kia','Opel','Fiat','Škoda','Nissan','MG','Mini','DS','Suzuki','Seat','Volvo','Cupra','Jeep','Land Rover','Lexus','Alfa Romeo','Porsche','Lynk & Co','Alpine','Mitsubishi','Smart','Jaguar','Abarth','Maserati','Lotus','Lamborghini','Bentley','Rolls Royce','Mobilize','Bugatti');
CREATE TYPE transaction_state AS ENUM ('En attente','Validé','Refusé');
CREATE TYPE role AS ENUM ('Directeur','IT','Finance','Service après vente','RH','Commercial');
CREATE TYPE vehicle_type AS ENUM ('Vente','Location');
CREATE TYPE category AS ENUM ('SUV', 'Berline', 'Compacte', 'Citadine', 'Cabriolet', 'Coupé', 'Break', 'Monospace', 'Pick-up', 'Roadster', 'Tout-terrain', 'Supercar', 'Hypercar', '2 Roues');

CREATE TABLE "employee" (
  "id" integer PRIMARY KEY,
  "role" role,
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "firstname" VARCHAR(255),
  "lastname" VARCHAR(255),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "password" VARCHAR(255),
  "firstname" VARCHAR(255),
  "lastname" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "telephone" VARCHAR UNIQUE,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "vehicle" (
  "id" integer PRIMARY KEY,
  "model" VARCHAR(255),
  "year" integer,
  "km" float,
  "type" vehicle_type,
  "price" float,
  "brand" brand,
  "energy" energy,
  "category" category,
  "description" VARCHAR(255)
);

CREATE TABLE "transaction" (
  "id" integer PRIMARY KEY,
  "id_vehicle" integer,
  "id_user" integer,
  "status" transaction_state,
  "id_admin" integer,
  "start_time" DATE,
  "end_time" DATE,
  "validated_at" TIMESTAMP,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

ALTER TABLE "transaction" ADD FOREIGN KEY ("id_vehicle") REFERENCES "vehicle" ("id");
ALTER TABLE "transaction" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");
ALTER TABLE "transaction" ADD FOREIGN KEY ("id_admin") REFERENCES "employee" ("id");