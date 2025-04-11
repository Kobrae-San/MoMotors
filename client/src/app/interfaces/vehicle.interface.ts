import {
  VehicleBrand,
  VehicleCategory,
  VehicleEnergy,
  VehicleType,
} from "@enums/vehicle.enum";

export default interface Vehicle {
  id?: number;
  model: string;
  year: number;
  km: number;
  type: VehicleType;
  price: number;
  brand: VehicleBrand;
  energy: VehicleEnergy;
  category: VehicleCategory;
  description: string;
}
