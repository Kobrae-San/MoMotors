from fastapi import FastAPI
<<<<<<< HEAD
from router import router
from shared.utils.app_config import app_config
from shared.utils.error_handler import add_error_handlers
=======
from controller import read_root, read_transaction, create_transaction
>>>>>>> 7c0ae4b (fix typo + add controller and repo)

app = app_config()

<<<<<<< HEAD
app.include_router(router)

add_error_handlers(app)
=======
@app.get("/")
def root():
    return read_root() 

@app.get("/transaction/{item_id}")
def get_transaction(item_id: int, q: Union[str, None] = None):
    return read_transaction(item_id, q)


@app.post("/transaction/create")
def post_transaction(item_id: int, q: Union[str, None] = None):
    return create_transaction(item_id, q)
>>>>>>> 7c0ae4b (fix typo + add controller and repo)
