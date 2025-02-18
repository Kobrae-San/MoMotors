CREATE TYPE energy AS ENUM ('Electrique','Diesel','Hybride','Essence');
CREATE TYPE brand AS ENUM ('Renault','Peugeot','Dacia','Citroën','Volkswagen','Toyota','Tesla','BMW','Mercedes','Ford','Audi','Hyundai','Kia','Opel','Fiat','Škoda','Nissan','MG','Mini','DS','Suzuki','Seat','Volvo','Cupra','Jeep','Land Rover','Lexus','Alfa Romeo','Porsche','Lynk & Co','Alpine','Mitsubishi','Smart','Jaguar','Abarth','Maserati','Lotus','Lamborghini','Bentley','Rolls Royce','Mobilize','Bugatti');
CREATE TYPE transaction_state AS ENUM ('En attente','Validé','Refusé');
CREATE TYPE vehicle_type AS ENUM ('Vente','Location');
CREATE TYPE category AS ENUM ('SUV', 'Berline', 'Compacte', 'Citadine', 'Cabriolet', 'Coupé', 'Break', 'Monospace', 'Pick-up', 'Roadster', 'Tout-terrain', 'Supercar', 'Hypercar', '2 Roues');

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "is_admin" BOOLEAN DEFAULT FALSE,
  "password" VARCHAR(255),
  "firstname" VARCHAR(255),
  "lastname" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "telephone" VARCHAR UNIQUE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "vehicle" (
  "id" SERIAL PRIMARY KEY,
  "model" VARCHAR(255),
  "year" integer,
  "km" float,
  "type" vehicle_type,
  "price" float,
  "brand" brand,
  "energy" energy,
  "category" category,
  "description" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "transaction" (
  "id" SERIAL PRIMARY KEY,
  "id_vehicle" integer,
  "id_user" integer,
  "status" transaction_state,
  "id_admin" integer,
  "start_time" DATE,
  "end_time" DATE,
  "validated_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "transaction" ADD FOREIGN KEY ("id_vehicle") REFERENCES "vehicle" ("id");
ALTER TABLE "transaction" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");
ALTER TABLE "transaction" ADD FOREIGN KEY ("id_admin") REFERENCES "user" ("id");

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_vehicle_timestamp
BEFORE UPDATE ON "vehicle"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_transaction_timestamp
BEFORE UPDATE ON "transaction"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
