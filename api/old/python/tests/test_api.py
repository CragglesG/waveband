from . import API
from dotenv import load_dotenv
import os

load_dotenv()

def test_api():
    api = API("thijmens.nl", 12346, os.getenv("API_KEY"))
    result = api.get(0)
    assert type(result) == bytes
