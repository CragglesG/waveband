import os
import redis
from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.wsgi import SlackRequestHandler

load_dotenv()

app = App(token=os.getenv("SLACK_BOT_TOKEN"), signing_secret=os.getenv("SLACK_SIGNING_SECRET"))
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

@app.command("/auth")
def whitelist_ip(ack, command):
    ack()
    ip = command['text'].split()[0]
    r.sadd("waveband-api-ip-whitelist", ip)
    app.client.chat_postEphemeral(channel=command['channel_id'], user=command['user_id'], text=f"The IP address `{ip}` has been whitelisted in the Waveband API.")

api = SlackRequestHandler(app)
