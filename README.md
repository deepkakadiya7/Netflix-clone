# Netflix Clone

A full-stack Netflix-clone web application built with **FastAPI** (Python) for the backend and **React** for the frontend.  
This project demonstrates a modern, scalable architecture and includes authentication, API endpoints, and a beautiful UI.

---

## 🗂️ Project Structure

```bash
.
├── backend/               # FastAPI backend
│   ├── .env
│   ├── requirements.txt
│   └── server.py
├── frontend/              # React frontend
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── ...
├── .emergent/             # Emergent platform files
│   ├── tests/
│   └── emergent.yml
├── tests/                 # Test cases
├── .gitignore
├── README.md
├── package-lock.json
├── yarn.lock
└── ...
```

# 🚀 Features

- User Authentication (to be implemented)
- Browse Movies/Shows (frontend)
- REST API for user actions and status checks
- MongoDB for data storage via Motor
- Modern UI with React & Tailwind CSS
- CORS enabled for cross-origin requests
- Environment Variables support
- Ready for testing and extension
  
  
# 🏗️ Tech Stack
- Backend: FastAPI, Motor (async MongoDB), Pydantic
- Frontend: React, Tailwind CSS, Axios
- Database: MongoDB

# ⚙️ Setup Instructions
1. Clone the repository
   ```bash
   clone https://github.com/deepkakadiya7/netflix-clone.git
    cd netflix-clone
   ```
   
2. Backend Setup
# Create .env file with your variables (see below)
 ```bash
pip install -r requirements.txt
uvicorn server:app --reload
```
.env example:
```bash
CopyMONGO_URL=mongodb://localhost:27017/
DB_NAME=netflix_clone
JWT_SECRET=your_jwt_secret
```

3. Backend Setup
# Create .env file with your variables (see below)
```bash
pip install -r requirements.txt
uvicorn server:app --reload
```
.env example:

```bash
MONGO_URL=mongodb://localhost:27017/
DB_NAME=netflix_clone
JWT_SECRET=your_jwt_secret
```
3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

4. Run Tests
```bash
# Make sure to check the /tests directory for test instructions
```


🤝 Contributing
- Fork the project
- Create your feature branch (git checkout -b feature/YourFeature)
- Commit your changes
- Push to the branch (git push origin feature/YourFeature)
- Open a Pull Request



