
from fastapi import BackgroundTasks, HTTPException
from pydantic import BaseModel
from fastapi.params import Depends
from .config import HOST, USERNAME, PASSWORD, PORT
from smtplib import SMTP
from email.message import EmailMessage
from fastapi import APIRouter
from microservices.authentication.routes import decode_access_token
router = APIRouter()
class MailBody(BaseModel):
    email:str
    customer:str
    discount:str
common_tags = ["email"] 
   
@router.post("/send-email",tags=common_tags)
async def send_email(body: MailBody, background_tasks: BackgroundTasks,token: str = Depends(decode_access_token)):
    try:
        message = EmailMessage()
        message['Subject'] = 'Special Offer: Exclusive Discount for Our Valued Customer!'
        message['From'] = USERNAME
        
        message['To'] = body.email
        message.set_content("Dear " + body.customer + ",<br><br>"
    "We hope this email finds you well. We wanted to take a moment to express our gratitude for your continued support and loyalty as a valued customer. Your patronage has made a significant impact on our business, and we sincerely appreciate it.<br><br>"
    "As we reviewed the sales data for the past year, we were thrilled to discover that you ranked number one in terms of total revenue generated. This remarkable achievement demonstrates your trust in our products and services, and we're truly grateful for your ongoing partnership.<br><br>"
    "To show our appreciation and encourage you to continue enjoying our offerings, we would like to extend a special offer exclusively for you. If you decide to make another purchase within the next month, we're delighted to offer you a " + body.discount + "% discount. This is our way of saying thank you and providing an extra incentive for you to experience the quality and satisfaction that our products/services deliver.<br><br>"
    "Please note that this exclusive discount is valid only for your next purchase and is non-transferable. To avail of this offer, simply provide instructions on how they can redeem the discount, such as using a unique promo code or contacting a specific representative.<br><br>"
    "Once again, we want to express our sincere appreciation for your trust and loyalty. We remain committed to providing you with exceptional products/services and a delightful shopping experience.<br><br>"
    "If you have any questions, require assistance, or need further information, please don't hesitate to reach out to our customer support team. We are always here to help.<br><br>"
    "Thank you again for being our esteemed customer. We look forward to serving you in the future and exceeding your expectations.<br><br>"
    "Best regards,<br>"
    "POULINA GROUP HOLDING", subtype="html")


        def send_email_task():
            with SMTP(HOST, PORT) as server:
                server.starttls()
                server.login(USERNAME, PASSWORD)
                server.send_message(message)

        background_tasks.add_task(send_email_task)
        return {"message": "Email sent successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

 




