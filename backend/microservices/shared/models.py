 
from datetime import date
import datetime
from pydantic import DateTimeError
from sqlalchemy import Column, Date, ForeignKey, ForeignKeyConstraint, Integer, String, Boolean,VARCHAR, SMALLINT,CHAR,DATETIME,Float, Table
 
from sqlalchemy.dialects.mysql import VARCHAR
from sqlalchemy.orm import  relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



class Client(Base):
    __tablename__ = "Clients"
    __table_args__ = {"schema": "dbo"}  # Optional: specify the schema name
    #id = Column(Integer, primary_key=True, autoincrement=True) 
    
    CodeEntite = Column(VARCHAR(4), nullable=False)
    CodeClient = Column(VARCHAR(8), nullable=False,primary_key=True)
    Client = Column(VARCHAR(50), nullable=False)
    Adresse = Column(VARCHAR(200), nullable=True)
    Ville =Column(VARCHAR(20), nullable=True)
    CodePostal = Column(VARCHAR(10), nullable=True)
    Region = Column(VARCHAR(50), nullable=True)
    Pays = Column(VARCHAR(28), nullable=True)
    Tel = Column(VARCHAR(16), nullable=True)
    Fax = Column(VARCHAR(16), nullable= True)
    DateCreation = Column(DATETIME(3), nullable=True)
    CodeClientFacturation = Column(VARCHAR(8), nullable=True)
    Site = Column(VARCHAR(10), nullable=True)
    Commercial = Column(VARCHAR(20), nullable=True)
    CompteClient = Column(VARCHAR(8), nullable=True)
    TypeClient = Column(VARCHAR(4), nullable=True)
    ClasseClient = Column(VARCHAR(30), nullable=True)
    BlocageCredit = Column(SMALLINT, server_default='FALSE', nullable=True)
    LimiteCredit = Column(Float, nullable=True)
    CodeRisque = Column(VARCHAR(2), nullable=True )
    ModePaiement = Column(CHAR(1), nullable=True)
    DelaiPaiement = Column(Integer, nullable= True)
    Identifiant = Column(VARCHAR(12), nullable= True)
    Matricule = Column(VARCHAR(20), nullable=True )
    PID1 = Column(VARCHAR(20), nullable=True )
    PID2 = Column(VARCHAR(20), nullable=True )
    DateChargement = Column(DATETIME, nullable=False)
    CodeStat1 = Column(VARCHAR(50), nullable= True)
    CodeStat2 = Column(VARCHAR(50), nullable=True )
    CodeStat3 = Column(VARCHAR(50), nullable=True )
    CodeStat4 = Column(VARCHAR(50), nullable=True )
    CodeStat5 = Column(VARCHAR(50), nullable=True )
    TypeAssurance = Column(VARCHAR(10), nullable=True  )
    QuotaAssurance = Column(Float, nullable= True )
    Typegarantie = Column(VARCHAR(10), nullable=True  )
    MntGarantite = Column(Float, nullable= True )
    Cl1 = Column(VARCHAR(30), nullable=True  )
    Cl2 = Column(VARCHAR(30), nullable= True )
    Cl3 = Column(VARCHAR(30), nullable= True )
    Cl4 = Column(VARCHAR(30), nullable= True )
    Cl5 = Column(VARCHAR(30), nullable=True  )
    formats = Column(VARCHAR(60), nullable=  True )
    Rmks = Column(VARCHAR(60), nullable= True )
    gouvernorat = Column(VARCHAR(100), nullable=True )
    SousCat = Column(VARCHAR(100), nullable=True )
    Categorie = Column(VARCHAR(100), nullable=True )
    Contact = Column(VARCHAR(100), nullable=True )
    Code1 = Column(VARCHAR(100), nullable=True )
    Code2 = Column(VARCHAR(100), nullable=True )
    Code3 = Column(VARCHAR(100), nullable=True )
    Code4 = Column(VARCHAR(100), nullable=True )
    #created_at =Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    class Config:
	    orm_mode=True
        



from sqlalchemy import Column, Integer, String, Float, DateTime

class Facturation(Base):
    __tablename__ = 'vte_f_facturation_hist'
    __table_args__ = {"schema": "dbo"}

    CodeEntite = Column(String(4), nullable=True)
    NumFacture = Column(String(20), nullable=True,primary_key=True)
    NumCommande = Column(String(20), nullable=True)
    Numligne = Column(String(20), nullable=True)
    Site = Column(String(8), nullable=True)
    DateCommmande = Column(DateTime, nullable=True)
    DatePrevLiv = Column(DateTime, nullable=True)
    DateLivraison = Column(DateTime, nullable=True)
    DateFacture = Column(DateTime, nullable=True)
    DateEcheance = Column(DateTime, nullable=True)
    CodeClient = Column(String(8), nullable=True)
    CompteClient = Column(String(8), nullable=True)
    CompteVente = Column(String(8), nullable=True)
    CodeCentreAnalyse = Column(String(4), nullable=True)
    CodeProjet = Column(String(8), nullable=True)
    CodeLigneProduit = Column(String(4), nullable=True)
    CodeArticle = Column(String(20), nullable=True)
    TauxEscompte = Column(Float, nullable=True)
    TauxRemise = Column(Float, nullable=True)
    ClasseTaxation = Column(String(2), nullable=True)
    CodeTVA = Column(String(4), nullable=True)
    TauxFodec = Column(Float, nullable=True)
    TauxTVA = Column(Float, nullable=True)
    DroitTimbre = Column(Float, nullable=True)
    QteLivree = Column(Float, nullable=True)
    QteFacturee = Column(Float, nullable=True)
    PrixUnit = Column(Float, nullable=True)
    TransportUnitHT = Column(Float, nullable=True)
    AutresFrais = Column(Float, nullable=True)
    UM = Column(String(2), nullable=True)
    Remarque = Column(String(50), nullable=True)
    DateChargement = Column(DateTime, nullable=True)
    NumProforma = Column(String(20), nullable=True)
    QteCommandee = Column(Float, nullable=True)
    Index_CMt = Column(String(10), nullable=True)
    ClientLivraison = Column(String(50), nullable=True)
    Commentaire1 = Column(String(76), nullable=True)
    Commentaire2 = Column(String(76), nullable=True)
    Commentaire3 = Column(String(76), nullable=True)
    Fac1 = Column(String(30), nullable=True)
    Fac2 = Column(String(30), nullable=True)
    Fac3 = Column(String(50), nullable=True)
    Fac4 = Column(String(130), nullable=True)
    Fac5 = Column(String(30), nullable=True)
    Fac6 = Column(String(30), nullable=True)
    Fac7 = Column(Float, nullable=True)
    Fac8 = Column(Float, nullable=True)
    montant = Column(Float, nullable=True)
    pays= Column(String,nullable=True)
    Article = Column(String(100), nullable=False)
    Client = Column(VARCHAR(50), nullable=False)
    class Config:
	    orm_mode=True



class Article(Base):
    __tablename__ = "Articles"
    __table_args__ = {"schema": "dbo"}  # Optional: specify the schema name

    CodeEntite = Column(String(4), nullable=False)
    CodeArticle = Column(String(10), nullable=False, primary_key=True)
    Article = Column(String(100), nullable=False)
    CodeLigneProduit = Column(String(10), nullable=True)
    LigneProduit = Column(String(100), nullable=True)
    DateCreation = Column(String(20), nullable=True)
    UniteMesure = Column(String(10), nullable=True)
    TauxConversion = Column(Float, nullable=True)
    TypeArticle = Column(String(20), nullable=True)
    GroupArticle = Column(String(20), nullable=True)
    GroupTechnique = Column(String(20), nullable=True)
    DureeVie = Column(Float, nullable=True)
    Acheteur = Column(String(50), nullable=True)
    PrixStandard = Column(Float, nullable=True)
    Status = Column(String(20), nullable=True)
    PID1 = Column(String(20), nullable=True)
    PID2 = Column(String(20), nullable=True)
    CodeStat1 = Column(String(20), nullable=True)
    CodeStat2 = Column(String(20), nullable=True)
    CodeStat3 = Column(String(20), nullable=True)
    CodeStat4 = Column(String(20), nullable=True)
    CodeStat5 = Column(String(20), nullable=True)
    DateChargement = Column(String(20), nullable=True)
    DateDB = Column(String(20), nullable=True)
    DateCPT = Column(String(20), nullable=True)
    Classearticle = Column(String(20), nullable=True)
    Categoriearticle = Column(String(20), nullable=True)
    taxe = Column(Float, nullable=True)
    codetaxe = Column(String(20), nullable=True)
    QteVital = Column(Float, nullable=True)
    Qtesec = Column(Float, nullable=True)
    Ptcmd = Column(Float, nullable=True)
    class Config:
	    orm_mode=True
     

class Role(Base):
    __tablename__ = 'roles'
    __table_args__ = {"schema": "dbo"}
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    class Config:
        orm_mode = True

class User(Base):
    __tablename__ = 'utilisateur'
    __table_args__ = {"schema": "dbo"}
    id = Column(Integer, primary_key=True)
    full_name = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean)

    class Config:
        orm_mode = True

user_association_role = Table(
    "user_association_role", 
    Base.metadata,
    Column("user_id", ForeignKey("dbo.utilisateur.id"), primary_key=True),
    Column("role_id", ForeignKey("dbo.roles.id"), primary_key=True)
)

User.roles = relationship('Role', secondary="user_association_role", back_populates="users")
Role.users = relationship('User', secondary="user_association_role", back_populates='roles')


from sqlalchemy import Column, Integer, String, DateTime, Time, Boolean, BigInteger

class Todo(Base):
    __tablename__ = 'todo'
    __table_args__ = {"schema": "dbo"}

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), index=True)
    description = Column(String(1000))
    time = Column(Date)
    completed = Column(Boolean, default=False)
    createdAt = Column(DateTime)

    class Config:
        orm_mode = True
