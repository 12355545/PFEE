from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
 

class Client(BaseModel):
    CodeEntite:str
    CodeClient :str
    Client :  str
    Pays : str
    Fax : str
    DateCreation : datetime
    CodeClientFacturation : str 
    Commercial : str
    Adresse : str 
    CodePostal : str
    CompteClient : str
    TypeClient : str
    ClasseClient :str
    BlocageCredit : int
    LimiteCredit : float
    CodeRisque : str
    ModePaiement : str
    DelaiPaiement : int
    Identifiant : str
    Matricule : str
    PID1 : str
    PID2 : str
    DateChargement : datetime
    CodeStat1 : str
    CodeStat2 : str
    CodeStat3 : str
    CodeStat4 : str
    CodeStat5 : str
    TypeAssurance :str
    QuotaAssurance : float
    Typegarantie : str
    MntGarantite : float
    Cl1 : str
    Cl2 : str
    Cl3 : str
    Cl4 : str
    Cl5 : str
    formats :str
    Rmks :  str
    gouvernorat : str
    SousCat :  str
    Categorie : str
    Contact :  str
    Code1 :  str
    Code2 : str 
    Code3 :  str
    Code4 :  str
    class Config:
	    orm_mode:True 
     


class User(BaseModel):
    full_name: str
    email: str
    password: str
class Role(BaseModel):
    name:str
class Login(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    
    
    
 
   