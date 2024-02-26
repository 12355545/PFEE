from fastapi.params import Depends
from typing import List, cast
from calendar import month_name
from sqlalchemy import DATE, Date, case, func, text 
from .database import get_db
from . import crud
from microservices.shared import models,schemas
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from microservices.shared.models import Facturation,Client,Article
from microservices.authentication.routes import decode_access_token
route = APIRouter()








 
from pydantic import BaseModel

class RevenueResponse(BaseModel):
    gouvernorat: str
    TotalRevenue: float


class RevenueResponse(BaseModel):
    data: List[dict]
 
from datetime import datetime


 

 

@route.get("/comparaison/{filter_date}",tags=["Charts"])
async def get_comparaison(filter_date: datetime,token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
    data=crud.comparaison(db,filter_date)
    return{"data":data}

@route.get("/revthisyear",tags=["Charts"])
async def get_revthisyear(token: str = Depends(decode_access_token) ,db: Session = Depends(get_db)):
    
    data=crud.revenue_theyear(db)
    return{"data":data}
 

@route.get("/revyears/{listyears}",tags=["Charts"])
async def get_revyear(list:List,token: str = Depends(decode_access_token) ,db: Session = Depends(get_db)):
    L=[]
    for i in list:
        resultat_0 = db.query(func.sum(Facturation.montant).label("revenue_"+list[0]))\
                       .filter(func.extract('year', Facturation.DateFacture) == list[0])

        L.append(resultat_0)

    data = []

    for row_2017, row_2018 in zip(resultat_2017, resultat_2018):
        revenue_2017 = row_2017.revenue_2017
        revenue_2018 = row_2018.revenue_2018

        if revenue_2017 is not None and revenue_2018 is not None:
            percentage_change = ((revenue_2018 - revenue_2017) / revenue_2017) * 100
        else:
            percentage_change = None

        data.append({
            "revenue_2017": revenue_2017,
            "revenue_2018": revenue_2018,
            "percentage_change": percentage_change
        })

    
    return{"data":data}
 


























 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
class revenueResponse(BaseModel):
    month: str
    total_revenue_N: float
     
class revenuesResponse(BaseModel):
    rev: List[revenueResponse]
    total_revenue_yearly: float

@route.get("/totalrevenue/{year}",tags=["Charts"],response_model=revenuesResponse)
async def get_totalrevenue(year1: int, db: Session = Depends(get_db)):
    results = db.query(
    func.MONTH(Facturation.DateFacture).label('month'),
    func.sum(case((func.YEAR(Facturation.DateFacture) == year1, Facturation.montant), else_=0)).label('total_revenue_N'),
     
).filter(
    func.YEAR(Facturation.DateFacture).in_([year1])
).group_by(
    func.MONTH(Facturation.DateFacture)
).order_by(
    'month'
).all()

    # 2. Fetch total revenue for the year
    total_yearly_revenue_result = db.query(
        func.sum(Facturation.montant).label('total_revenue_yearly')
    ).filter(
        func.YEAR(Facturation.DateFacture) == year1
    ).first()

    data = []

    for row in results:
        data.append({
            "month":month_name[row.month],
            "total_revenue_N": row.total_revenue_N,
              
        })
    total_revenue_yearly = total_yearly_revenue_result.total_revenue_yearly if total_yearly_revenue_result else 0
    
    return revenuesResponse(rev=data,total_revenue_yearly=total_revenue_yearly)

class saleResponse(BaseModel):
    month: str
    total_revenue_N: float
    total_revenue_Nplus :float

class salesResponse(BaseModel):
    sales: List[saleResponse]
     
@route.get("/sales",tags=["Charts"],response_model=salesResponse)
async def get_totalrevenue(token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
    results = db.query(
    func.MONTH(Facturation.DateFacture).label('month'),
    func.sum(case((func.YEAR(Facturation.DateFacture) == 2017, Facturation.montant), else_=0)).label('total_revenue_N'),
    func.sum(case((func.YEAR(Facturation.DateFacture) == 2018, Facturation.montant), else_=0)).label('total_revenue_Nplus')
).filter(
    func.YEAR(Facturation.DateFacture).in_([2017, 2018])
).group_by(
    func.MONTH(Facturation.DateFacture)
).order_by(
    'month'
).all()


    data = []

    for row in results:
        data.append({
            "month":month_name[row.month],
            "total_revenue_N": row.total_revenue_N,
             "total_revenue_Nplus": row.total_revenue_Nplus,
        })

    return salesResponse(sales=data)


class saResponse(BaseModel):
    month: str
    total_revenue_N: float
     

class sasResponse(BaseModel):
    sales: List[saResponse]
     



@route.get("/montanteachyear/{listyear}/{choix}", tags=["Charts"], response_model=sasResponse)
async def get_total(listyear: str,choix:str, db: Session = Depends(get_db)):
    list_of_years = list(map(int, listyear.split(',')))
    data = []
    if (choix=='month'):
        for year in list_of_years:
            query_result = db.query(
            func.MONTH(Facturation.DateFacture).label('month'),
            func.sum(case((func.YEAR(Facturation.DateFacture) == year, Facturation.montant), else_=0)).label('total_revenue_N'),
        ).filter(
            func.YEAR(Facturation.DateFacture) == year
        ).group_by(
            func.MONTH(Facturation.DateFacture)
        ).order_by(
            'month'
        ).all()

            for row in query_result:
                data.append({
                "month": row.month,
                "total_revenue_N": row.total_revenue_N,
            })
        return sasResponse(sales=data)
    elif choix == "quarter":
        for year in list_of_years:
            query_result = db.query(
                func.MONTH(Facturation.DateFacture).label('month'),
                func.sum(case((func.YEAR(Facturation.DateFacture) == year, Facturation.montant), else_=0)).label('total_revenue_N'),
            ).filter(
                func.YEAR(Facturation.DateFacture) == year
            ).group_by(
                func.MONTH(Facturation.DateFacture)
            ).order_by(
                'month'
            ).all()

            s = 0
            for i, row in enumerate(query_result):
                s += row.total_revenue_N
                if (i + 1) % 3 == 0:
                    data.append({
                        "month": f"trimester {i // 3 + 1}",
                        "total_revenue_N": s,
                    })
                    s = 0

        return sasResponse(sales=data)
        
        
 
class ecartResponse(BaseModel):
    year: str
    ecart_type: float
    variance: float  # Add a new field for variance

class ecartsResponse(BaseModel):
    ecart: List[ecartResponse]

@route.get("/ecarttype/{listyear}", tags=["Charts"], response_model=ecartsResponse)
async def calculate_ecart_type(listyear: str, db: Session = Depends(get_db)):
    list_of_years = list(map(int, listyear.split(',')))
    data = []

    for year in list_of_years:
        query = text(f"""
            SELECT 
                SQRT(SUM(POWER(montant - avg_montant, 2)) / COUNT(montant)) AS ecart_type,
                SUM(POWER(montant - avg_montant, 2)) / COUNT(montant) AS variance  -- Calculate variance
            FROM (
                SELECT montant, 
                    (SELECT AVG(montant) 
                     FROM vte_F_Facturation_hist 
                     WHERE DATEPART(YEAR, datefacture) = {year}) AS avg_montant
                FROM vte_F_Facturation_hist
                WHERE DATEPART(YEAR, DateFacture) = {year}
            ) AS subquery;
        """)

        result = db.execute(query)
        ecart_type, variance = result.fetchone()

        data.append({
            "year": str(year),
            "ecart_type": ecart_type,
            "variance": variance,  # Include the variance value
        })

    return ecartsResponse(ecart=data)














































#------------------dashboard-sales------------------------------
#-------------------region---------------------------
class TopRegionResponse(BaseModel):
     
    gouvernorat: str
    TotalRevenue: float

class TopRegionsResponse(BaseModel):
    regions: List[TopRegionResponse]
from sqlalchemy import func, cast, Date

@route.get("/reg/{year}",tags=["Charts"], response_model=TopRegionsResponse )
async def get_region(year: int, db: Session = Depends(get_db),token: str = Depends(decode_access_token)):
      
    results = db.query(
        func.CONCAT(
            func.UPPER(func.LEFT(Client.gouvernorat, 1)),
            func.LOWER(func.SUBSTRING(Client.gouvernorat, 2, func.LENGTH(Client.gouvernorat)))
        ).label('gouvernorat'),
        func.SUM(Facturation.montant).label('TotalRevenue')
    ).join(Client, Facturation.CodeClient == Client.CodeClient) \
     .filter(func.extract('year', Facturation.DateFacture) == year) \
     .group_by(Client.gouvernorat)

    data = []
    rev_kef=0
    gouvernorats = [
    'Nabeul', 'Tunis', 'Ben arous', 'Ariana', 'La mannouba', 'Bizerte', 'Beja',
    'Jendouba', 'Siliana', 'El kef', 'Kasserine', 'Kairouan', 'Sousse','Le kef',
    'Sidi bouzid','Monastir','Mahdia','Zaghouan', 'Gafsa', 'Tozeur', 'Kebili', 'Gabes', 'Medenine', 'Tataouine','Sfax','Kef'
]

    for row in results:
        if row.gouvernorat in gouvernorats:
            if row.gouvernorat in ['El kef','Le kef','Kef']:
                rev_kef +=row.TotalRevenue
            else :
                
                data.append({
                
            "gouvernorat": row.gouvernorat,
            "TotalRevenue": row.TotalRevenue
        })
    if rev_kef > 0:
        data.append({
                
            "gouvernorat": "El kef",
            "TotalRevenue": rev_kef
        })

    return TopRegionsResponse(regions=data)

#---------------------------------------pays--------------------------
class TopPayResponse(BaseModel):
    pays: str
    ventes_totales: float

class TopPaysResponse(BaseModel):
    pays: List[TopPayResponse]



@route.get("/globalsales/{year}",tags=["Charts"],response_model=TopPaysResponse )
async def get_globalsales(year:int,token: str = Depends(decode_access_token),db: Session = Depends(get_db)):
     
    results = db.query(
        Facturation.pays, func.sum(Facturation.montant).label("ventes_totales")
    )\
    .filter(func.extract('year', Facturation.DateFacture) == year)\
    .group_by(Facturation.pays)\
    .order_by(func.sum(Facturation.montant).desc()).all()


    
    data = []
    total_revenue_tunisia = 0
    
    for row in results:
        pays = row.pays
        if pays is None: # Check if pays is None
            continue # Skip this iteration if pays is None
        pays = pays.capitalize()
        if pays in ["Tunis", "Tunisia", "Tunisie", "Tunisie-"]:
            total_revenue_tunisia += row.ventes_totales
        else:
            data.append({
            "pays": pays,
            "ventes_totales": row.ventes_totales
        })

    if total_revenue_tunisia > 0:
        data.append({
        "pays": "Tunisia",
        "ventes_totales": total_revenue_tunisia
    })

    
     
    
    return TopPaysResponse(pays=data)

#-----------------------------produits-------------------------
class TopproResponse(BaseModel):
    
    total_revenue: float
    article: str

class TopprosResponse(BaseModel):
    prods: List[TopproResponse]

@route.get("/toppro/{year}",tags=["Charts"], response_model=TopprosResponse)
async def get_topproducts(year:int ,token: str = Depends(decode_access_token),db: Session = Depends(get_db)):
     
    results = db.query(
    Facturation.CodeArticle, func.sum(Facturation.montant).label("total_revenue"), Facturation.Article
).filter(func.extract('year', Facturation.DateFacture) == year)\
     .group_by(Facturation.CodeArticle, Facturation.Article)\
 .order_by(func.sum(Facturation.montant).desc())\
 .limit(1)

    data = []

    for row in results:
        data.append({
            
            "total_revenue": row.total_revenue,
            "article": row.Article
        })

    return TopprosResponse(prods=data)


#------------------clients-----------------------
class TopclResponse(BaseModel):
    
    Client:str 
    TotalRevenue: float

class TopclsResponse(BaseModel):
    cls: List[TopclResponse]
@route.get("/cl/{year}",tags=["Charts"],response_model=TopclsResponse)
async def get_comparaison(year:int, token: str = Depends(decode_access_token),db: Session = Depends(get_db)):
    
    results = db.query( Facturation.Client, func.sum(Facturation.montant).label('total_revenue')) \
        .filter(func.extract('year', Facturation.DateFacture) == year) \
        .group_by(Facturation.CodeClient, Facturation.Client) \
        .order_by( func.sum(Facturation.montant).desc()) \
        .limit(1) \
        .all()

    data = []

    for row in results:
        data.append({
             
            "Client": row.Client,
            "TotalRevenue": row.total_revenue,
        })

    return TopclsResponse(cls=data)















#-----------------------Table-Transctions---------------------------


class ArticleResponse(BaseModel):
    ArticleCode: str
    ArticleName: str

class TransactionResponse(BaseModel):
    CodeClient: int
    Client: str
    DateFacture: datetime
    totalamount: float
    articles: List[ArticleResponse]

class TransactionsResponse(BaseModel):
    data: List[TransactionResponse]

@route.get("/transctions/{codeclient}/{start_date}/{end_date}", tags=["Charts"], response_model=TransactionsResponse)
async def get_transctions(codeclient: int, start_date:datetime, end_date:datetime,article_code: int = None,token: str = Depends(decode_access_token), db: Session = Depends(get_db)):

    query = (db.query(Facturation.CodeClient, Client.Client, Facturation.DateFacture, func.sum(Facturation.montant).label('totalamount'), Article.CodeArticle, Article.Article)
       .join(Client, Client.CodeClient == Facturation.CodeClient)
       .join(Article, Article.CodeArticle == Facturation.CodeArticle) # Assuming this join
       .filter(Facturation.CodeClient == codeclient))

    if start_date:
        query = query.filter(Facturation.DateFacture >= start_date)
    if end_date:
        query = query.filter(Facturation.DateFacture <= end_date)
    if article_code:
        query = query.filter(Article.CodeArticle == article_code)

    res = query.group_by(Facturation.CodeClient, Client.Client, Facturation.DateFacture, Article.CodeArticle, Article.Article).all()

    data = []
    for row in res:
        articles = [{"ArticleCode": row.CodeArticle, "ArticleName": row.Article}]
        data.append({
            "CodeClient": row.CodeClient,
            "Client": row.Client,
            "DateFacture": row.DateFacture,
            "totalamount": row.totalamount,
            "articles": articles
        })

    return TransactionsResponse(data=data)




@route.get("/trans/{codeclient}/{start_date}", tags=["Charts"], response_model=TransactionsResponse)
async def get_trans(codeclient: int, start_date:datetime,article_code: int = None,token: str = Depends(decode_access_token), db: Session = Depends(get_db)):

    query = (db.query(Facturation.CodeClient, Client.Client, Facturation.DateFacture, func.sum(Facturation.montant).label('totalamount'), Article.CodeArticle, Article.Article)
       .join(Client, Client.CodeClient == Facturation.CodeClient)
       .join(Article, Article.CodeArticle == Facturation.CodeArticle) # Assuming this join
       .filter(Facturation.CodeClient == codeclient))

    if start_date:
        query = query.filter(cast(Facturation.DateFacture, DATE) == start_date.date())
   
    if article_code:
        query = query.filter(Article.CodeArticle == article_code)

    res = query.group_by(Facturation.CodeClient, Client.Client, Facturation.DateFacture, Article.CodeArticle, Article.Article).all()

    data = []
    for row in res:
        articles = [{"ArticleCode": row.CodeArticle, "ArticleName": row.Article}]
        data.append({
            "CodeClient": row.CodeClient,
            "Client": row.Client,
            "DateFacture": row.DateFacture,
            "totalamount": row.totalamount,
            "articles": articles
        })

    return TransactionsResponse(data=data)


 
























 



#---------------------------------------dashboardcustomers-------------------------
#-----------------------------------filer customer by two dates ----------------------
class TopCusResponse(BaseModel):
    CodeClient: int
    Client: str
    TotalAmount: float

class TopCusrsResponse(BaseModel):
    customers: List[TopCusResponse]

@route.get("/topcus/{start_date}/{end_date}", tags=["Charts"], response_model=TopCusrsResponse) # Note the change here
 

async def get_custs(start_date:datetime,end_date:datetime, token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
     
    res = db.query(Facturation.CodeClient, Client.Client, func.sum(Facturation.montant).label('TotalAmount'))\
           .join(Client, Client.CodeClient == Facturation.CodeClient)\
           .filter(Facturation.DateFacture >= start_date, Facturation.DateFacture <= end_date)\
           .group_by(Facturation.CodeClient, Client.Client)\
           .order_by(func.sum(Facturation.montant).desc())\
           .limit(20)\
           .all()

    print("Query result:", res)  # Debug print

    data = []
    for row in res:
        data.append({
            "CodeClient": row.CodeClient,
            "Client": row.Client,
            "TotalAmount": row.TotalAmount
        })

    print("Data list:", data)  # Debug print

    return TopCusrsResponse(customers=data)











class TopCustomerResponse(BaseModel):
    CodeClient: int
    Client: str
    TotalAmount: float

class TopCustomersResponse(BaseModel):
    customers: List[TopCustomerResponse]

@route.get("/topcustomers/{start_date}", tags=["Charts"], response_model=TopCustomersResponse) # Note the change here
 

async def get_customers(start_date: datetime, db: Session = Depends(get_db)):
    
    res = db.query(Facturation.CodeClient, Client.Client, func.sum(Facturation.montant).label('TotalAmount'))\
           .join(Client, Client.CodeClient == Facturation.CodeClient)\
            .filter(cast(Facturation.DateFacture, DATE) == start_date.date())\
           .group_by(Facturation.CodeClient, Client.Client)\
           .order_by(func.sum(Facturation.montant).desc())\
           .limit(20)\
           .all()

    print("Query result:", res)  # Debug print

    data = []
    for row in res:
        data.append({
            "CodeClient": row.CodeClient,
            "Client": row.Client,
            "TotalAmount": row.TotalAmount
        })

    print("Data list:", data)  # Debug print

    return TopCustomersResponse(customers=data)


class TopClientResponse(BaseModel):
    CodeClient: int
    Client: str
    TotalAmount: float

class TopClientsResponse(BaseModel):
    customers: List[TopCustomerResponse]

@route.get("/topclients/{year}", tags=["Charts"], response_model=TopClientsResponse) # Note the change here
async def get_clients(year:int, token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
     
    res = db.query(Facturation.CodeClient, Client.Client, func.sum(Facturation.montant).label('TotalAmount'))\
           .join(Client, Client.CodeClient == Facturation.CodeClient)\
           .filter(func.extract('year', Facturation.DateFacture) == year)\
           .group_by(Facturation.CodeClient, Client.Client)\
           .order_by(func.sum(Facturation.montant).desc())\
           .limit(20)\
           .all()

     
    data = []
    for row in res:
        data.append({
            "CodeClient": row.CodeClient,
            "Client": row.Client,
            "TotalAmount": row.TotalAmount
        })

    print("Data list:", data)  # Debug print

    return TopClientsResponse(customers=data)


#----------------------------dashboard-products---------------------------
#-----------------------------products-filter-by-date-------------------------------
class TopproductResponse(BaseModel):
    
    Article: str
    TotalAmount: float

class TopproductsResponse(BaseModel):
    products: List[TopproductResponse]

@route.get("/topproducts/{start_date}", tags=["Charts"], response_model=TopproductsResponse) # Note the change here
async def get_products(start_date: datetime, token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
    
    res = db.query(Facturation.CodeArticle, Article.Article, func.sum(Facturation.montant).label('TotalAmount'))\
           .join(Article, Article.CodeArticle == Facturation.CodeArticle)\
           .filter(cast(Facturation.DateFacture, DATE) == start_date.date())\
           .group_by(Facturation.CodeArticle, Article.Article)\
           .order_by(func.sum(Facturation.montant).desc())\
           .limit(20)\
           .all()

     

    data = []
    for row in res:
        data.append({
             
            "Article": row.Article,
            "TotalAmount": row.TotalAmount
        })

     
    return TopproductsResponse(products=data)



@route.get("/topprs/{start_date}/{end_date}", tags=["Charts"], response_model=TopproductsResponse) # Note the change here
async def get_prs(start_date: datetime, end_date:datetime , token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
    
    res = db.query(Facturation.CodeArticle, Article.Article, func.sum(Facturation.montant).label('TotalAmount'))\
           .join(Article, Article.CodeArticle == Facturation.CodeArticle)\
           .filter(Facturation.DateFacture >= start_date, Facturation.DateFacture <= end_date)\
           .group_by(Facturation.CodeArticle, Article.Article)\
           .order_by(func.sum(Facturation.montant).desc())\
           .limit(20)\
           .all()

     

    data = []
    for row in res:
        data.append({
             
            "Article": row.Article,
            "TotalAmount": row.TotalAmount
        })

     
    return TopproductsResponse(products=data)




































#----------------products-filter-by-year-----------------------------
@route.get("/topproduits/{year}", tags=["Charts"], response_model=TopproductsResponse)
async def get_produits(year: int, token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
    
    res = (
    db.query(
        Facturation.CodeArticle,
        Facturation.Article,
        func.sum(Facturation.montant).label('TotalAmount')
    )
    .filter(func.extract('year', Facturation.DateFacture) == year)
    .group_by(Facturation.CodeArticle, Facturation.Article)
    .order_by(func.sum(Facturation.montant).desc())
    .limit(20)
    .all()
)

     

    data = []
    for row in res:
        data.append({
             
            "Article": row.Article,
            "TotalAmount": row.TotalAmount
        })

     
    return TopproductsResponse(products=data)































































































  