from fastapi import APIRouter, Depends

from session import get_session, SessionData
from schemas import IntegerRequest

router = APIRouter()


@router.post("/api/add-stack-node")
def add_stack_node(data: IntegerRequest, session: SessionData = Depends(get_session)):
    session.stack.append(data.value)
    return {"nodes": session.stack.to_list()}


@router.post("/api/pop")
def pop_stack_node(session: SessionData = Depends(get_session)):
    session.stack.pop()
    return {"nodes": session.stack.to_list()}


@router.get("/api/get-stack-nodes")
def get_stack_nodes(session: SessionData = Depends(get_session)):
    return {"nodes": session.stack.to_list()}
