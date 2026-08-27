from typing import List

from pydantic import BaseModel


class IntegerRequest(BaseModel):
    value: int


class ArrayRequest(BaseModel):
    values: List[int]


class SortRequest(BaseModel):
    algorithm: str = "bubble"
