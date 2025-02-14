from shared.models.transaction import TransactionModel
from shared.utils.database import Database

class TransactionRepository:
    @staticmethod
    def find_all():
        db = Database()
        query = "SELECT * FROM transaction"
        result = db.query(query)
        return result if result else None
    
    @staticmethod
    def create(transaction: TransactionModel):
        db = Database()

        query = """
            INSERT INTO transaction (id_vehicle, id_user, status, id_admin, validated_at, start_time, end_time)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """
        
        try:
            result = db.query(query, (
                transaction.id_vehicle,  
                transaction.id_user,
                transaction.status,
                transaction.id_admin,
                transaction.validated_at,
                transaction.start_time,
                transaction.end_time
            ))

            if result:
                transaction.id = result[0]
                return transaction
            else:
                return None
        except Exception as e:
            print(f"Erreur lors de l'exécution de la requête SQL: {e}")
            return None
    
    # @staticmethod
    # def find_by_id(db: Session, transaction_id: int):
    #     query = "SELECT * FROM transactions WHERE id = :id"
    #     result = db.execute(query, {"id": transaction_id}).fetchone()
    #     return result if result else None
    

