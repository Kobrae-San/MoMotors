import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.dbname = os.getenv("DB_NAME")
        self.user = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.host = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")

    def _connect(self):
        try:
            conn = psycopg2.connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port
            )
            cur = conn.cursor()
            return conn, cur
        except Exception as e:
            print(f"Database connection error : {e}")
            return None, None

    def _execute(self, query, params=None, fetch=False):
        conn, cur = self._connect()
        if not conn:
            return None

        try:
            cur.execute(query, params)
            if fetch:
                result = cur.fetchall()
            else:
                conn.commit()
                result = None
        except Exception as e:
            print(f"Error while executing query : {e}")
            result = None
        finally:
            cur.close()
            conn.close()
        
        return result

    def query(self, query, params=None):
        if query.strip().lower().startswith("select"):
            return self._execute(query, params, fetch=True)
        else:
            self._execute(query, params)