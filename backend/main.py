from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
 
from microservices.email.mailer import router
from microservices.authentication.routes import routers
from microservices.analytics.routers import route
from microservices.admin.routess import routess
from microservices.user.routee import routee
from microservices.analytics.database import routeees
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
 

 
app.include_router(router)
app.include_router(route)
app.include_router(routers)
app.include_router(routess)
app.include_router(routee)
app.include_router(routeees)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
