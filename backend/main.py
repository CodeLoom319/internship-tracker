from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, Internship

app = FastAPI()

# CORS configuration to allow frontend (React) to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Internship Tracker API is running"}

# Create a new internship entry
@app.post("/internships")
def add_internship(
    company_name: str,
    role: str,
    status: str,
    db: Session = Depends(get_db)
):
    internship = Internship(
        company_name=company_name,
        role=role,
        status=status
    )

    db.add(internship)
    db.commit()
    db.refresh(internship)

    return internship

# Fetch all internships
@app.get("/internships")
def get_internships(db: Session = Depends(get_db)):
    return db.query(Internship).all()

# Delete an internship by ID
@app.delete("/internships/{internship_id}")
def delete_internship(
    internship_id: int,
    db: Session = Depends(get_db)
):
    internship = db.query(Internship).filter(
        Internship.id == internship_id
    ).first()

    if not internship:
        return {"error": "Internship not found"}

    db.delete(internship)
    db.commit()

    return {"message": "Internship deleted"}
