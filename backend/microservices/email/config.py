import os
from dotenv import load_dotenv

 

load_dotenv()

HOST = os.environ.get("MAIL_HOST", "smtp.gmail.com")
PORT = int(os.environ.get("MAIL_PORT", 587))
USERNAME = os.environ.get("MAIL_USERNAME", "mazraa1poulinaHolding@gmail.com")
PASSWORD = os.environ.get("MAIL_PASSWORD", "rdxnvtfluzfnjuty")
AUTH = os.environ.get("MAIL_AUTH", True)
STARTTLS_ENABLE = os.environ.get("MAIL_STARTTLS_ENABLE", True)
DEFAULT_ENCODING = os.environ.get("MAIL_DEFAULT_ENCODING", "UTF-8")

 