from typing import List

#Bubble Sort Step Calculator

def bubble_sort_steps(arr: List[int]) -> List[dict]:
    a = list(arr)
    steps = [{"array": list(a), "comparing": [], "swapped": False}]
    n = len(a)
    for i in range(n):
        for j in range(n - i - 1):
            steps.append({"array": list(a), "comparing": [j, j + 1], "swapped": False})
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                steps.append({"array": list(a), "comparing": [j, j + 1], "swapped": True})
    steps.append({"array": list(a), "comparing": [], "swapped": False})
    return steps

#Insertion Sort Step Calculator
def insertion_sort_steps(arr: List[int]) -> List[dict]:
    a = list(arr)
    steps = [{"array": list(a), "comparing": [], "swapped": False}]
    for i in range(1, len(a)):
        j = i
        while j > 0:
            steps.append({"array": list(a), "comparing": [j - 1, j], "swapped": False})
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]
                steps.append({"array": list(a), "comparing": [j - 1, j], "swapped": True})
                j -= 1
            else:
                break
    steps.append({"array": list(a), "comparing": [], "swapped": False})
    return steps

#Selection Sort Step Calculator
def selection_sort_steps(arr: List[int]) -> List[dict]:
    a = list(arr)
    steps = [{"array": list(a), "comparing": [], "swapped": False}]
    n = len(a)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            steps.append({"array": list(a), "comparing": [min_idx, j], "swapped": False})
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            steps.append({"array": list(a), "comparing": [i, min_idx], "swapped": True})
    steps.append({"array": list(a), "comparing": [], "swapped": False})
    return steps


SORT_ALGORITHMS = {
    "bubble": bubble_sort_steps,
    "insertion": insertion_sort_steps,
    "selection": selection_sort_steps,
}
