from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# PostgreSQL database connection URL
DATABASE_URL =  "postgresql://postgres:postgres123@localhost:5432/internship_db"

# Create SQLAlchemy engine (manages DB connections)
engine = create_engine(DATABASE_URL)

# Session factory for database interactions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Dependency function to provide a database session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
