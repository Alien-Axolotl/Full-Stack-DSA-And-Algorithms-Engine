import uuid
from typing import Dict
import os

from fastapi import Request, Response

from structures.linked_list import LinkedList
from structures.stack import Stack

SESSION_COOKIE_NAME = "session_id"
SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 

IS_PRODUCTION = os.environ.get("ENVIRONMENT") == "production"


#Initialize DSA and Algorithms for Session

class SessionData:
    def __init__(self):
        self.linked_list = LinkedList()
        self.stack = Stack()
        self.array: list[int] = []


sessions: Dict[str, SessionData] = {}   


def get_session(request: Request, response: Response) -> SessionData:
    session_id = request.cookies.get(SESSION_COOKIE_NAME)

    if not session_id or session_id not in sessions:
        session_id = uuid.uuid4().hex
        sessions[session_id] = SessionData()
        response.set_cookie(
            key=SESSION_COOKIE_NAME,
            value=session_id,
            httponly=True,
            samesite="none" if IS_PRODUCTION else "lax",
            secure=IS_PRODUCTION,
            max_age=SESSION_MAX_AGE_SECONDS,
        )

    return sessions[session_id]
