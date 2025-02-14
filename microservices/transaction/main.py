from typing import Union
from fastapi import FastAPI
from shared.utils.database import Database

app = FastAPI()
db = Database()

@app.get("/")
def get_transactions():
    ### Route accessible uniquement si connecté
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
    admin = True #Mettre une vrai fonction qui vérifie si on est admin
    if not admin :
        id_user = 1 #Récupérer le vrai id du client
        query += ' WHERE u.id = %s'
        params = (id_user,)
    query += ' ORDER BY t.status'

    results = db.query(query, params)

    return {"data": results}