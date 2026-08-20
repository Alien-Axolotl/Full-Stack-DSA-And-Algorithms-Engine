import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import linked_list, stack, sort



#FASTAPI APP

app = FastAPI(title="DSA and Algorithms Engine", version="1.0")


#-------------

FRONTEND_ORIGINS = os.environ.get(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")

#--------------


# CORS POLICY
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(linked_list.router)
app.include_router(stack.router)
app.include_router(sort.router)
