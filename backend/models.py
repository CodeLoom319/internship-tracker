from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

# Base class for all database models
Base = declarative_base()

class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    status = Column(String, nullable=False)
