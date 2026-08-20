from typing import List, Optional

#Linked List Node Declaration

class LinkedListNode:
    def __init__(self, val: int):
        self.val = val
        self.next: Optional["LinkedListNode"] = None

#Linked List Operations Declaration

class LinkedList:
    def __init__(self):
        self.head: Optional[LinkedListNode] = None
        self.tail: Optional[LinkedListNode] = None

    def delete_list(self):
        self.head = None
        self.tail = None 
        #note : python auto clears after connection is lost

    def append(self, val: int):
        new_node = LinkedListNode(val)
        if not self.head:
            self.head = new_node
            self.tail = new_node
            return
        self.tail.next = new_node
        self.tail = new_node

    def split(self, head):
        if head is None or head.next is None:
            return None

        slow = head
        fast = head
        prev = None

        while fast is not None and fast.next is not None:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        if prev is not None:
            prev.next = None

        return slow

    def merge(self, left_head, right_head):
        dummy = LinkedListNode(0)
        current = dummy

        p1 = left_head
        p2 = right_head

        while p1 is not None and p2 is not None:
            if p1.val <= p2.val:
                current.next = p1
                p1 = p1.next
            else:
                current.next = p2
                p2 = p2.next
            current = current.next

        if p1 is not None:
            current.next = p1
        if p2 is not None:
            current.next = p2

        return dummy.next

    def merge_splits(self, head: Optional[LinkedListNode]):
        if head is None or head.next is None:
            return head

        right_half = self.split(head)
        left_half = head

        sorted_left = self.merge_splits(left_half)
        sorted_right = self.merge_splits(right_half)

        return self.merge(sorted_left, sorted_right)

    def to_sort(self):
        self.head = self.merge_splits(self.head)

        if self.head is None:
            self.tail = None
        else:
            current = self.head
            while current.next is not None:
                current = current.next
            self.tail = current

        return self.head

    def to_list(self) -> List[int]:
        elements = []
        current = self.head
        while current:
            elements.append(current.val)
            current = current.next
        return elements
