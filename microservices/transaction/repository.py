from shared.utils.database import Database
from shared.models.transaction import TransactionModel

def fetch_transactions():
    query = '''
        SELECT
            t.id, t.status, t.validated_at,
            u.firstname, u.lastname, u.id id_user,
            v.id id_vehicle, v.brand, v.model, v.price, v.type,
            CASE
                WHEN v.type = 'Location' THEN t.start_time
                ELSE NULL
            END AS start_time,
            CASE
                WHEN v.type = 'Location' THEN t.end_time
                ELSE NULL
            END AS end_time
        FROM "transaction" t
            JOIN "user" u ON t.id_user = u.id
            JOIN "vehicle" v ON t.id_vehicle = v.id
    '''
    
    params = ()
    admin = True # Remplacer par une vraie vérification
    if not admin:
        id_user = 1 # Remplacer par l’ID du client connecté
        query += ' WHERE u.id = %s'
        params = (id_user,)
    query += ' ORDER BY t.status'

    return Database.query(query, params)

def fetch_transactions_by_id(id: int):
    query = '''
        SELECT
            t.id, t.status, t.validated_at, t.created_at,
            u.firstname, u.lastname, u.email, u.telephone, 
            v.id id_vehicle, v.brand, v.model, v.price, v.type, v.year, v.km, v.energy, v.category, v.category, v.description,
            CASE
                WHEN v.type = 'Location' THEN t.start_time
                ELSE NULL
            END AS start_time,
            CASE
                WHEN v.type = 'Location' THEN t.end_time
                ELSE NULL
            END AS end_time
        FROM "transaction" t
            JOIN "user" u ON t.id_user = u.id
            JOIN "vehicle" v ON t.id_vehicle = v.id
        WHERE t.id = %s
    '''
    
    params = (id,)
    return Database.query(query, params)

def update_transaction_status(id: int, status: str):
    id_admin = 1 # Remplacer par l'ID de l'admin
    query = '''
        UPDATE transaction
        SET id_admin = %s, status = %s
        WHERE id = %s;
    '''
    params = (id_admin, status, id)

    return Database.query(query, params)

def create_transaction(transaction: TransactionModel):
    query = """
        INSERT INTO transaction (id_vehicle, id_user, status, id_admin, validated_at, start_time, end_time)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
    """

    params = (transaction.id_vehicle, transaction.id_user, transaction.status, transaction.id_admin, transaction.validated_at, transaction.start_time, transaction.end_time)

    result = Database.query(query, params)

    return result[0] if result else None


def delete_transaction(id: int):
    query = """
        DELETE FROM transaction WHERE id = %s;
    """ 
    
    params = (id,)

    result = Database.query(query, params)

    return result if result else None