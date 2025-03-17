from . import API

def test_api():
    api = API("thijmens.nl", 12346, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDE5NDg2MTQsInVpZCI6IlUwNzhIMTBRM01aIiwidW5hbWUiOiJ0aGlqbWVuaGVuZ2VsIn0.hCbWARjlg6ccoxF50qd4j7xcqpbiySANu22yUEjhnDE")
    result = api.get(0)
    assert type(result) == bytes
