from fastapi import APIRouter, Depends

from session import get_session, SessionData
from schemas import ArrayRequest, SortRequest
from algorithms.sorting import SORT_ALGORITHMS

router = APIRouter()


@router.post("/api/sort/set-array")
def set_sort_array(data: ArrayRequest, session: SessionData = Depends(get_session)):
    session.array = list(data.values)
    return {"array": session.array}


@router.get("/api/sort/get-array")
def get_sort_array(session: SessionData = Depends(get_session)):
    return {"array": session.array}


@router.post("/api/sort/run")
def run_sort(data: SortRequest, session: SessionData = Depends(get_session)):
    step_fn = SORT_ALGORITHMS[data.algorithm]
    steps = step_fn(session.array)
    session.array = steps[-1]["array"]
    return {"steps": steps, "final": session.array}
