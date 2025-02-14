from shared.models.transaction import TransactionModel
from shared.utils.database import Database

class TransactionRepository:
    @staticmethod
    def find_all():
        db = Database()
        query = "SELECT * FROM transaction"
        result = db.query(query)
        return result if result else None
    
    # @staticmethod
    # def create(db: Session, transaction: TransactionModel):
    #     query = """
    #     INSERT INTO transactions (id_vehicle, id_user, status, id_admin, created_at, updated_at, validated_at, start_time, end_time)
    #     VALUES (:id_vehicle, :id_user, :status, :id_admin, NOW(), NOW(), :validated_at, :start_time, :end_time)
    #     RETURNING id;
    #     """
    #     result = db.execute(query, transaction.dict())
    #     db.commit()
    #     return result.fetchone()[0]

    # @staticmethod
    # def find_by_id(db: Session, transaction_id: int):
    #     query = "SELECT * FROM transactions WHERE id = :id"
    #     result = db.execute(query, {"id": transaction_id}).fetchone()
    #     return result if result else None
    

