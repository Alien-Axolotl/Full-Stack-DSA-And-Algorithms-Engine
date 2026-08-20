If you wanna test a live deploy try this website : https://full-stack-dsa-and-algorithms-engine-1.onrender.com/ (It runs on a free tier so it might be a bit slow , Note: No scheduled session cleanup / memory eviction was implemented. On Render free tier upon inactivity Render restarts fresh on the next request which clears all in-memory session state as a side effect)

# Full Stack DSA and Algorithms Engine

A full-stack DSA Engine: a FastAPI backend implements the actual data
structures and algorithms, a React frontend renders and animates them.
Each visitor gets their own isolated session (via a cookie), so multiple
people can use the app at the same time without stepping on each other's
data.

## Features

- **Linked List** — append, merge sort, clear
- **Stack** — push, pop
- **Sorting Visualizer** — bubble / insertion / selection sort with a full
  step-by-step trace you can play, pause, and step through frame by frame

## Architecture

- `main.py` — FastAPI app. All state lives server-side, keyed by a
  per-visitor session id set as an httponly cookie on first request.
- `frontend/` — React + Vite. `src/api.js` centralizes API calls and
  makes sure the session cookie is always sent (`credentials: 'include'`).

## Running locally

**Backend**
```bash
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
uvicorn main:app --reload
```
Runs on `http://localhost:8000`.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

By default the frontend talks to `http://localhost:8000/api` and the
backend allows requests from `http://localhost:5173`. To point elsewhere,
set `VITE_API_BASE` (frontend) and `FRONTEND_ORIGINS` (backend, comma
separated).

## API overview

| Endpoint | Description |
|---|---|
| `POST /api/add-node`, `GET /api/get-nodes`, `POST /api/sort-list`, `POST /api/remove-list` | Linked list |
| `POST /api/add-stack-node`, `POST /api/pop`, `GET /api/get-stack-nodes` | Stack |
| `POST /api/sort/set-array`, `GET /api/sort/get-array`, `POST /api/sort/run` | Sorting |

