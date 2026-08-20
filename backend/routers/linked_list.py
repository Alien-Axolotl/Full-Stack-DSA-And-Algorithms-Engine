from fastapi import APIRouter, Depends

from session import get_session, SessionData
from schemas import IntegerRequest

router = APIRouter()

@router.post("/api/add-node")
def add_linked_list_node(data: IntegerRequest, session: SessionData = Depends(get_session)):
    session.linked_list.append(data.value)
    return {"nodes": session.linked_list.to_list()}


@router.post("/api/sort-list")
def sort_linked_list(session: SessionData = Depends(get_session)):
    session.linked_list.to_sort()
    return {"nodes": session.linked_list.to_list()}


@router.post("/api/remove-list")
def remove_linked_list(session: SessionData = Depends(get_session)):
    session.linked_list.delete_list()
    return {"nodes": session.linked_list.to_list()}


@router.get("/api/get-nodes")
def get_linked_list_nodes(session: SessionData = Depends(get_session)):
    return {"nodes": session.linked_list.to_list()}
