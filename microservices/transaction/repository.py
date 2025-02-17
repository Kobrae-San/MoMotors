from shared.utils.database import Database

def fetch_transactions():
    query = '''
        SELECT
            t.id, t.status, t.validated_at,
            u.firstname, u.lastname,
            v.id id_vehicle, v.model, v.price, v.type,
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

def update_transaction_status(id: int, status: str):
    id_admin = 1 # Remplacer par l'ID de l'admin
    query = '''
        UPDATE transaction
        SET id_admin = %s, status = %s
        WHERE id = %s;
    '''
    params = (id_admin, status, id)

    return Database.query(query, params)