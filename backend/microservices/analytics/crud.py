
import datetime
from microservices.shared.models import Facturation
from microservices.shared.models import Client
from microservices.shared.models import Article
from sqlalchemy.orm import Session
from sqlalchemy import Date, case, distinct
from sqlalchemy import func





 






 
from sqlalchemy import case, func, null





















from datetime import timedelta
from sqlalchemy import func, case, literal
from sqlalchemy import func, extract

def revenue_theyear(db):
    resultat_2017 = db.query(func.sum(Facturation.montant).label("revenue_2017"))\
                       .filter(func.extract('year', Facturation.DateFacture) == 2017)

    resultat_2018 = db.query(func.sum(Facturation.montant).label("revenue_2018"))\
                       .filter(func.extract('year', Facturation.DateFacture) == 2018)

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

    return data

from pydantic import BaseModel
from typing import List




