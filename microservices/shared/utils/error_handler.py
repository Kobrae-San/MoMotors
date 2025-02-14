from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

async def not_found_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=404,
        content={"error": "Not found"}
    )

async def internal_error_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error"}
    )

async def connection_error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=503,
        content={"error": f"Database connection error: {exc}"}
    )

async def query_error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=400,
        content={"error": f"Query execution error: {exc}"}
    )

# Fonction pour ajouter tous les gestionnaires d'erreurs à l'application FastAPI
def add_error_handlers(app):
    app.add_exception_handler(404, not_found_handler)
    app.add_exception_handler(500, internal_error_handler)
    app.add_exception_handler(ConnectionError, connection_error_handler)
    app.add_exception_handler(RuntimeError, query_error_handler)
