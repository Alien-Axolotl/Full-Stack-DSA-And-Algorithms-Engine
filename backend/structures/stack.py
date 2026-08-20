from typing import List, Optional

#Stack Node Declaration

class StackNode:
    def __init__(self, val: int):
        self.val = val
        self.next: Optional["StackNode"] = None

#Stack Operations Declaration

class Stack:
    def __init__(self):
        self.head: Optional[StackNode] = None

    def append(self, value: int):
        new_node = StackNode(value)
        new_node.next = self.head
        self.head = new_node

    def pop(self) -> Optional[int]:
        if self.head is None:
            return None
        value = self.head.val
        self.head = self.head.next
        return value

    def to_list(self) -> List[int]:
        elements = []
        current = self.head
        while current:
            elements.append(current.val)
            current = current.next
        return elements
