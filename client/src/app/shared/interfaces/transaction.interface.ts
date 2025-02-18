import { TransactionStatus } from "../enums/transaction.enum";

export default interface Transaction {
  id: number;
  id_vehicle: number;
  id_user: number;
  status: TransactionStatus;
  id_admin: number;
  created_at?: Date;
  updated_at?: Date;
  validated_at?: Date;
  start_time?: Date;
  end_time?: Date;
}
