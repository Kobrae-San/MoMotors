import psycopg2
import os
from dotenv import load_dotenv
from psycopg2.extras import DictCursor

load_dotenv()

class Database:
    conn = None
    cur = None

    def __init__(self):
        if Database.conn is None:
            self.dbname = os.getenv("DB_NAME")
            self.user = os.getenv("DB_USER")
            self.password = os.getenv("DB_PASSWORD")
            self.host = os.getenv("DB_HOST")
            self.port = os.getenv("DB_PORT")
            self._connect()

    def _connect(self):
        try:
            Database.conn = psycopg2.connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                cursor_factory=DictCursor
            )
            Database.conn.autocommit = True
            Database.cur = Database.conn.cursor()
        except psycopg2.OperationalError as e:
            raise ConnectionError(f"Database connection error: {e}")
        except Exception as e:
            raise RuntimeError(f"An unexpected error occurred while connecting to the database: {e}")

    @classmethod
    def query(cls, query, params=None):
        if cls.conn is None or cls.cur is None:
            db_instance = cls()
            db_instance._connect()

        try:
            cls.cur.execute(query, params)

            if query.strip().lower().startswith("select"):
                return [dict(row) for row in cls.cur.fetchall()]
            
            # pour INSERT UPDATE OU DELETE
            if "RETURNING" in query:
                cls.conn.commit()
                result = cls.cur.fetchone()  # Récupère la première ligne (ID retourné par RETURNING)
                if result:
                    return result  # Retourner l'ID de la première colonne (0 index)
                else:
                    return None
                
        except psycopg2.Error as e:
            cls.conn.rollback()
            raise RuntimeError(f"Query execution error: {e}")
        except Exception as e:
            cls.conn.rollback()
            raise RuntimeError(f"An unexpected error occurred while executing the query: {e}")