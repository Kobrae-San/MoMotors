CREATE TYPE energy AS ENUM ('electric','diesel','hybrid','hydrogen','CNG','LPG');
CREATE TYPE brand AS ENUM ('Renault','Peugeot','Dacia','Citroën','Volkswagen','Toyota','Tesla','BMW','Mercedes','Ford','Audi','Hyundai','Kia','Opel','Fiat','Škoda','Nissan','MG','Mini','DS','Suzuki','Seat','Volvo','Cupra','Jeep','Land Rover','Lexus','Alfa Romeo','Porsche','Lynk & Co','Alpine','Mitsubishi','Smart','Jaguar','Abarth','Maserati','Lotus','Lamborghini','Bentley','Rolls Royce','Mobilize','Bugatti');
CREATE TYPE transaction_state AS ENUM ('pending','validated','refused');
CREATE TYPE role AS ENUM ('director','IT','finance','after_sales','HR','sales');
CREATE TYPE vehicle_type AS ENUM ('buy','location');
CREATE TYPE category AS ENUM ('suv','sedan','hatchback','city_car','convertible','coupe','station_wagon','minivan','pickup','roadster','off_road','supercar','hypercar');

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
  "id_user" integer UNIQUE,
  "status" transaction_state,
  "id_admin" integer UNIQUE,
  "start_time" DATE,
  "end_time" DATE,
  "validated_at" TIMESTAMP,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "employee_transaction" (
  "employee_id" integer,
  "transaction_id_admin" integer,
  PRIMARY KEY ("employee_id", "transaction_id_admin")
);

ALTER TABLE "employee_transaction" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id");

ALTER TABLE "employee_transaction" ADD FOREIGN KEY ("transaction_id_admin") REFERENCES "transaction" ("id_admin");

CREATE TABLE "user_transaction" (
  "user_id" integer,
  "transaction_id_user" integer,
  PRIMARY KEY ("user_id", "transaction_id_user")
);

ALTER TABLE "user_transaction" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_transaction" ADD FOREIGN KEY ("transaction_id_user") REFERENCES "transaction" ("id_user");

ALTER TABLE "transaction" ADD FOREIGN KEY ("id_vehicle") REFERENCES "vehicle" ("id");